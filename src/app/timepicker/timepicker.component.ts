import { Component } from '@angular/core';





@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css']
})
export class TimepickerComponent {
  timings: { from: string; to: string }[] = [];
  list: { from: string; to: string }[] = [];

  addEmptyTiming() {
    this.timings.push({ from: '', to: '' });
  }

  removeTiming(index: number) {
    this.timings.splice(index, 1);
    this.list = [];
    this.list = [...this.timings];
    this.list.sort(this.sortListComparator);
  }

  addTiming() {
    // Check for overlapping timings
    if (this.isTimingValid()) {
      alert("Start cannot be after End");
      return;
    }
    const doesTimingOverlap = this.isTimingsOverlap();
    if (doesTimingOverlap) {
      alert('Timings cannot overlap!');
      return;
    }

    this.timings.push({ from: '', to: '' });
    this.list = [];
    for (let i = 0; i < this.timings.length - 1; i++) {
      this.list.push(this.timings[i]);
    }

    this.list=this.list.sort(this.sortListComparator);
  }

  sortListComparator(time1:{ from: string; to: string }, time2:{ from: string; to: string }){
    const time1Parts = time1.from.split(':').map(Number);
    const time2Parts = time2.from.split(':').map(Number);
    console.log(time1Parts, " gege ", time2Parts)

    if (time1Parts[0] < time2Parts[0]) {
      return -1; // Hour of time1 is before time2
    } else if (time1Parts[0] === time2Parts[0]) {
      return time1Parts[1] < time2Parts[1] ? -1 : 1; // Minutes of time1 is before time2
    } else {
      return 0; // Hour of time1 is after time2
    }
  }
      
    
  
  isTimingValid() {
    for (let i = 0; i < this.timings.length; i++) {
      if (this.isTime1BeforeTime2(this.timings[i].to, this.timings[i].from)) {
        return true;
      }
    }
    return false;
  }

  isTimingsOverlap(): boolean {
    for (let i = 0; i < this.timings.length; i++) {
      for (let j = i + 1; j < this.timings.length; j++) {
        const timingA = this.timings[i];
        const timingB = this.timings[j];
        if (
          this.isTime1BeforeTime2(timingA.from, timingB.to) &&
          this.isTime1BeforeTime2(timingB.from, timingA.to)
        ) {
          return true; // Timings overlap
        }
      }
    }

    return false; // No overlap
  }

  isTime1BeforeTime2(time1: string, time2: string): boolean {
    const time1Parts = time1.split(':').map(Number);
    const time2Parts = time2.split(':').map(Number);

    if (time1Parts[0] < time2Parts[0]) {
      return true; // Hour of time1 is before time2
    } else if (time1Parts[0] === time2Parts[0]) {
      return time1Parts[1] < time2Parts[1]; // Minutes of time1 is before time2
    } else {
      return false; // Hour of time1 is after time2
    }
  }

}
