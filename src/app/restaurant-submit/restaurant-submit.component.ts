import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { SessionService } from '../services/session.service';
import { WebSocketService } from '../services/WebsocketService';

@Component({
  selector: 'app-restaurant-submit',
  templateUrl: './restaurant-submit.component.html',
  styleUrls: ['./restaurant-submit.component.css']
})
export class RestaurantSubmitComponent implements OnInit, OnDestroy {
  restaurants: Restaurant[] = [];
  sessionId!: number;
  stompClient: any;
  socketSubscription!: Subscription;
  selectedRes!: Restaurant;
  isDisconnectEnabled!: boolean;

  constructor(private restaurantService: RestaurantService,
    private sessionService: SessionService, 
    private router: ActivatedRoute, 
    private webSocketService: WebSocketService,
    private route: Router) { 
      
      this.stompClient = this.webSocketService.connect();
      this.stompClient.connect({}, () => {
          this.socketSubscription = this.stompClient
          .subscribe('/topic/restaurants', (data: any) => {
              this.restaurants = JSON.parse(data.body);
            });

            this.stompClient
            .subscribe('/topic/selectedRestaurants', (data: any) => {
              console.log(JSON.parse(data.body));
              const res: Restaurant = JSON.parse(data.body);
              if(res.sessionId == this.sessionId) {
                this.selectedRes = res;
              }
            });
        });
        
    }

    ngOnDestroy(): void {
      if(this.socketSubscription) {
        this.socketSubscription.unsubscribe();
      }
      if(this.stompClient.status === 'CONNECTED') {
        this.stompClient.disconnect();
      }   
    }

    onlyText(event: KeyboardEvent) {
      const char = String.fromCharCode(event.charCode);
      if (!/^[A-Za-z ]+$/.test(char)) {
        event.preventDefault();
      }
    }

    disconnect(){
      this.sessionService.endSession(this.sessionId).subscribe(
        (response) => {
          console.log("Ended session successfully:", response);
          this.selectedRes = response;
          //this.route.navigate(['/submit-restaurant', sessionId]);
        },
        (error) => {
          console.error("Error ending session:", error);
        }
      );
      if (this.stompClient !== null) {
        this.stompClient.disconnect();
      }
    }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.sessionId = params['sessionId'];
      this.isDisconnectEnabled = 
        (params['username'] === JSON.parse(localStorage.getItem("currentUser")!).username);
    });
    this.getRestaurants();
  }

  getRestaurants() {
    this.restaurantService.getRestaurants(this.sessionId).subscribe(
      (response) => {
        this.restaurants = response;
      },
      (error) => {
        console.error("Error getting restaurants:", error);
        this.route.navigate(['/home']);
      }
    );
  }

  submitRestaurant(textInput: HTMLInputElement) {
    if (textInput.value.trim() === '') {
      return;
    }

    this.restaurantService.submitRestaurant(textInput.value, this.sessionId).subscribe(
      (response) => {
        textInput.placeholder = "Enter Restaurant Name";
        textInput.value = "";
        console.log("Restaurant submitted successfully:", response);
      },
      (error) => {
        console.error("Error submitting restaurant:", error);
      }
    );
  }
}
