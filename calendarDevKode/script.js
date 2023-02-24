class CalendarDevKode {
  constructor(data) {
    this.data = this.sortData(data);
    this.calendarContainer = document.getElementById("calendarContainer");
    this.conflictData = [];
    this.generateUi();
    this.placeCard(this.data);
  }

  sortData(data) {
    const newData = data.sort((a, b) => {
      const [hour, minute] = a.startTime.split(":");
      const [hourb, minuteb] = b.startTime.split(":");
      const totalStartTimeA = Number(hour) + Number(minute) / 60;
      const totalStartTimeB = Number(hourb) + Number(minuteb) / 60;
      return totalStartTimeA - totalStartTimeB;
    });
    return newData;
  }

  generateUi() {
    for (let i = 0; i <= 24; i++) {
      const time = document.createElement("div");
      const p = document.createElement("p");
      p.innerHTML = `${i}:00`;
      const line = document.createElement("div");
      time.appendChild(p);
      time.appendChild(line);
      time.classList.add("time");
      time.style.top = `${i * 52}px`;
      this.calendarContainer.appendChild(time);
    }
  }

  getConflictTime(data) {
    let conflictingLen = 0;

    const { startTime } = data;
    const [startHour, startMinute] = startTime.split(":");
    const totoalStartTime = Number(startHour) + Number(startMinute) / 60;

    for (let conflictData of this.conflictData) {
      const { endTime } = conflictData;
      const [endHour, endMinute] = endTime.split(":");
      const totoalEndTime = Number(endHour) + Number(endMinute) / 60;
      if (totoalStartTime < totoalEndTime) {
        conflictingLen += 1;
      }
    }
    this.conflictData.push(data);

    return conflictingLen;
  }

  getTopPositionInPixel = (startTime) => {
    const [hour, minute] = startTime.split(":");
    const topPosition = Number(hour) + Number(minute / 60);
    return topPosition;
  };

  getHeight = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");
    const startTingHour = Number(endHour) - Number(startHour);
    const startingMinute = (Number(endMinute) - Number(startMinute)) / 60;
    const height = startTingHour + startingMinute;
    return height;
  };

  placeCard(data) {
    data.forEach((ele) => {
      const { startTime, endTime, title, color } = ele;
      const topPosition = this.getTopPositionInPixel(startTime);
      const totalHeight = this.getHeight(startTime, endTime);
      const timeCard = document.createElement("div");
      timeCard.innerHTML = `${startTime}-${endTime}-->titlle ${title}  `;
      timeCard.classList.add("timeCard");
      timeCard.style.top = `${topPosition * 52}px`;
      timeCard.style.background = color;
      timeCard.style.height = `${totalHeight * 60}px`;
      // Conlficting time
      const conflictLen = this.getConflictTime(ele);
      const left = `${40 + 50 * conflictLen}px`;
      timeCard.style.marginLeft = `${left}`;

      //
      this.calendarContainer.appendChild(timeCard);
    });
  }
}

const data = [
  {
    startTime: "00:00",
    endTime: "01:30",
    color: "#f6be23",
    title: "#TeamDevkode",
  },
  {
    startTime: "3:30",
    endTime: "7:30",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "4:30",
    endTime: "8:30",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "6:30",
    endTime: "9:00",
    color: "#f6501e",
    title: "Demo",
  },
  {
    startTime: "11:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "12:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "9:30",
    endTime: "10:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "16:00",
    endTime: "17:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "15:00",
    endTime: "17:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "18:00",
    endTime: "19:00",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "20:30",
    endTime: "22:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
];

new CalendarDevKode(data);
