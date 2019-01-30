import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs/internal/Observable';
import {any} from 'codelyzer/util/function';

@Injectable()
export class MessageService {
  reverseMorseAlphabet = this.getReverseMorseAlphabet();

  constructor(private db: AngularFirestore) { }

  getMessages(): Observable<any> {
    return this.db.collection('messages', ref => ref.orderBy('message')).valueChanges();
  }

  getMessagesLastByLimit(limit: number): Observable<any> {
    return this.db.collection('messages', ref => ref.orderBy('message', 'desc').limit(limit)).valueChanges();
  }

  getMessagesPaged(limit: number, startAt?: any): Observable<any> {
    return this.db.collection('messages', ref => ref.orderBy('message').limit(limit).startAfter(startAt.time)).valueChanges();
  }

  addMessage(time: Date, message: any): Promise<any> {
    if (time && this.messageOk(message)) {
      const messageCollection = this.db.collection<any>('messages');
      return messageCollection.add({time: time, message: message});
    } else {
      return new Promise((resolve, reject) => {
        reject('Value is not a valid morse code');
      });
    }
  }


  getReverseMorseAlphabet() {
    return {
      '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
      '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
      '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
      '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
      '-.--': 'Y', '--..': 'Z', '/': ' ',
      '-----': '0', '.----': '1', '..---': '2', '...--': '3', '....-': '4',
      '.....': '5', '-....': '6', '--...': '7', '---..': '8', '----.': '9'
    };
  }

  convertToText(morse: string): string {
    let text = '';
    const words = morse.toString().split('/');
    for (const word of words) {
      const chars = word.split(' ');
      for (const char of chars) {
        const letter = this.reverseMorseAlphabet[char.toUpperCase()];
        if (letter !== undefined) {
          text += letter;
        } else {
          text += char;
        }
      }
      text += ' ';
    }

    return text;
  }

  messageOk(morse: string): boolean {
    const words = morse.toString().split('/');
    for (const word of words) {
      if (word.trim().length === 0) {
        continue;
      }
      const chars = word.split(' ');
      for (const char of chars) {
        if (char.trim().length === 0) {
          continue;
        }
        const letter = this.reverseMorseAlphabet[char.toUpperCase()];
        if (letter === undefined) {
          console.log(char);
          return false;
        }
      }
    }
    return true;
  }

}
