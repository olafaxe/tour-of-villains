import { Component, OnInit } from "@angular/core";
import { Villain } from "../villain";
import { VillainService } from "../villain.service";

@Component({
  selector: "app-villains",
  templateUrl: "./villains.component.html",
  styleUrls: ["./villains.component.css"]
})
export class VillainsComponent implements OnInit {
  hero = "Windstorm";
  selectedVillain;
  villains: Villain[];

  constructor(private villainService: VillainService) {}

  ngOnInit() {
    this.getVillains();
  }

  getVillains(): void {
    this.villainService
      .getVillains()
      .subscribe(villain => (this.villains = villain));
  }

  add(name: string, identity: string, power: string): void {
    name = name.trim();
    identity = identity.trim();
    power = power.trim();
    const level = Math.floor(Math.random() * 10000);
    if (!name || !identity || !power) {
      return;
    }
    this.villainService
      .addVillain({ name, identity, power, level } as Villain)
      .subscribe(villain => {
        this.villains.push(villain);
      });
  }

  delete(villain: Villain): void {
    this.villains = this.villains.filter(h => h !== villain);
    this.villainService.deleteVillain(villain).subscribe();
  }
}
