import { Component, OnInit } from '@angular/core';
import { timeCards, Trivia } from '../data/timecards';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit {

  cards: Trivia[];
  points: number = 0;
  endGame = false;

  leftCard: Trivia;
  rightCard: Trivia;

  constructor(
  ) { }

  ngOnInit() {
    this.cards = timeCards;
    this.getCards();
  }

  getCards() {
    this.leftCard = this.cards[Math.floor(Math.random() * this.cards.length)];

    do {
      this.rightCard = this.cards[Math.floor(Math.random() * this.cards.length)];
    } while (this.leftCard == this.rightCard);
  }

  chooseCard(chosen: 'left' | 'right') {
    if (chosen === this.compareCards(this.leftCard, this.rightCard)) {
      this.points++;
      this.getCards();
    } else {
      this.endGame = true;
    }
  }

  compareCards(a: Trivia, b: Trivia) {
    const aDate = new Date(a.year, a.month, a.day);
    const bDate = new Date(b.year, b.month, b.day);

    return aDate < bDate ? 'left' : 'right';
  }

  reset() {
    this.endGame = false;
    this.points = 0;
    this.getCards();
  }

  shareTwitter() {
    const url = `http://twitter.com/share?text=I managed to put ${this.points} Times in the right time order. Can you get more than me?&url=https://gabtoschi.github.io/timingtime/&hashtags=timingtime, 1hgj`;

    window.open(url, '_blank');
  }

}
