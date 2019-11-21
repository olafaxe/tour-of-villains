import { InMemoryDbService } from "angular-in-memory-web-api";
import { Villain } from "./villain";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const villains = [
      {
        id: 10,
        level: 9999,
        name: "King Karl",
        identity: "Mr West",
        power: "Superior intellect"
      },
      {
        id: 11,
        level: 0.5,
        name: "Mr Not-here",
        identity: "Daniel Ehk",
        power: "Powerful Salesmanship & Transparency"
      },
      {
        id: 12,
        level: 100,
        name: "Chris the Crosser",
        identity: "Christoffer Lunkarn",
        power: "Snarky remarks"
      },
      {
        id: 13,
        level: 25,
        name: "Mr Finish",
        identity: "Matthias Suomi",
        power: "Voice of the people"
      },
      {
        id: 14,
        level: 99,
        name: "Super Simon",
        identity: "Simon Sss",
        power: "Beer"
      },
      {
        id: 15,
        level: 2000,
        name: "C.S.S.",
        identity: "Christian 'Coffee' Ståhl",
        power: "Cascading superpowers"
      }
    ];
    return { villains };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(villains: Villain[]): number {
    return villains.length > 0
      ? Math.max(...villains.map(villain => villain.id)) + 1
      : 11;
  }
}
