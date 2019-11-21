import { Component, OnInit, Input } from "@angular/core";
import { Villain } from "../villain";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

import { VillainService } from "../villain.service";

@Component({
  selector: "app-villain-detail",
  templateUrl: "./villain-detail.component.html",
  styleUrls: ["./villain-detail.component.css"]
})
export class VillainDetailComponent implements OnInit {
  @Input() villain: Villain;
  constructor(
    private route: ActivatedRoute,
    private villainService: VillainService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getVillain();
  }

  getVillain(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.villainService
      .getVillain(id)
      .subscribe(villain => (this.villain = villain));
  }
  save(): void {
    this.villainService
      .updateVillain(this.villain)
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
}
