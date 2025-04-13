import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  accountBalance: number = 0;
  depositAmount: number = 0;
  withdrawAmount: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadAccountBalance();
  }

  loadAccountBalance() {
    this.authService.getAccountBalance().subscribe((data) => {
      this.accountBalance = data.balance;
    });
  }

  onDeposit() {
    this.authService.deposit(this.depositAmount).subscribe(() => {
      this.loadAccountBalance();
    });
  }

  onWithdraw() {
    this.authService.withdraw(this.withdrawAmount).subscribe(() => {
      this.loadAccountBalance();
    });
  }
}
