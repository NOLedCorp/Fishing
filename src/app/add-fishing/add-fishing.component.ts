import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { Fishing, Sailor, Positions } from '../services/models';
import { FishingService } from '../services/fishing.service';

@Component({
  selector: 'add-fishing',
  templateUrl: './add-fishing.component.html',
  styleUrls: ['./add-fishing.component.less']
})
export class AddFishingComponent implements OnInit {
  @Input() fishings:Fishing[];

  fishingForm:FormGroup;
  sailors = [];
  sailorsValues:Sailor[] = [];
  submitted = false;
  csubmitted = false;
  constructor(private fb:FormBuilder, private ms:ModalService, public fs:FishingService) { }

  ngOnInit() {
    
    if(this.fs.boats.length==0){
      this.ms.close();
    }
    this.fs.getSailors().subscribe(data => {
      this.sailorsValues = data;
      this.fishingForm = this.fb.group({
        BoatId: [0, Validators.required],
        DateStart: [new Date().toISOString().substring(0,10), Validators.required],
        DateFinish: [this.DateFinish.toISOString().substring(0,10), Validators.required]
      });
    })
    
  }

  add(){
    this.submitted=true;
    if(this.fishingForm.invalid){
      
      return;
    }
    let boat = this.fs.boats.find(x => x.BoatId == this.fishingForm.value.BoatId);
    let fishing = {
      BoatId:boat.BoatId,
      DateStart:this.fishingForm.value.DateStart,
      DateFinish:this.fishingForm.value.DateFinish,
      Sailors:this.sailors
    }
    this.fs.addFishing(fishing).subscribe(fid => {
      this.fishings.push({
        FishingId:fid,
        BoatId:boat.BoatId,
        Boat:boat,
        DateStart:this.fishingForm.value.DateStart,
        DateFinish:this.fishingForm.value.DateFinish,
        Banks:[],
        Sailors:this.sailorsValues.filter(x => this.sailors.map(y => y.SailorId).indexOf(x.SailorId)>-1)
      })
      console.log(this.fishings);
      this.ms.close();
    })
    
  }

  get DateFinish(){
    let date = new Date(new Date().toDateString());
    date.setDate(date.getDate()+2);
    return date;
  }

  addSailor(){
    this.csubmitted = true;
    if(this.sailors.length==0){
      this.sailors.push({SailorId:null, Position:''});
      this.csubmitted = false;

    }else{
      if(this.sailors[this.sailors.length-1].SailorId==null || this.sailors[this.sailors.length-1].Position=='' ){
        return
      }
      this.sailors.push({SailorId:null, Position:''});
      this.csubmitted = false;
      
    }
    
  }
  remove(i){
    this.sailors.splice(i,1);
  }

  getSailor(id){
    let s = this.sailorsValues.find(x => x.SailorId==id);
    return s.Name+' '+s.Surname;
  }

  get f() { return this.fishingForm.controls;}
  get Positions() { return [Positions.Boatswain, Positions.Captain, Positions.ChiefMate, Positions.Engineer, Positions.Navigator, Positions.RadioStaff, Positions.Sailor, Positions.Shopman]}

}
