class CalendarDevKode {
  constructor(data) {
    this.data = data;
    this.calendarContainer = document.getElementById("calendarContainer");
    this.generateUi();

    this.placeCard(this.data);
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

  getTopPositionInPixel = (startTime) => {
    const [hour, minute] = startTime.split(":");
    const topPosition = Number(hour) + Number(minute / 60);
    return topPosition;
  };

  getHeight = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":");
    const [endHour, endMinute] = endTime.split(":");
    const startTingHour = Number(endHour) - Number(startHour);
    const startingMinute = Number(endMinute) - Number(startMinute);
    const height = (startTingHour + startingMinute / 60) * 60;
    console.log(startTime, endTime, height);
    return height;
  };

  placeCard(data) {
    data.forEach((ele) => {
      const { startTime, endTime, title } = ele;
      const topPosition = this.getTopPositionInPixel(startTime);
      const totalHeight = this.getHeight(startTime, endTime);
      const timeCard = document.createElement("div");
      timeCard.innerHTML = `${startTime}-${endTime}-->titlle ${title}  `;
      timeCard.classList.add("timeCard");
      timeCard.style.top = `${topPosition * 52}px`;
      timeCard.style.height = `${totalHeight}px`;
      this.calendarContainer.appendChild(timeCard);
    });
  }
}

const data = [
  {
    startTime: "0:00",
    endTime: "1:30",
    color: "#f6be23",
    title: "#TeamDevkode",
  },
  {
    startTime: "4:30",
    endTime: "7:30",
    color: "#f6501e",
    title: "#TeamDevkode",
  },
  {
    startTime: "12:00",
    endTime: "13:30",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "9:00",
    endTime: "10:00",
    color: "#029be5",
    title: "#TeamDevkode",
  },
  {
    startTime: "16:00",
    endTime: "19:00",
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
