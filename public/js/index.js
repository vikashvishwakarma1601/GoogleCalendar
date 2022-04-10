const sampleData = [
  {
    startTime: "00:00",
    endTime: "01:30",
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

const container = document.querySelector(".container");
const loader = document.querySelector("#loader");
const loaderItem = Array.from(
  document.querySelectorAll("#loader .loader-items .pixel")
);
const fragment = document.createDocumentFragment();
const cache = [];

const renderSlot = () => {
  for (let i = 0; i < 24; i++) {
    let slot = createTimeSlot(i);
    fragment.appendChild(slot);
    cache[i] = slot;
  }
  return fragment;
};

(function () {
  let idx = 0;
  let id = setInterval(() => {
    loaderItem[idx].style.transform = "scale(1.4)";
    loaderItem[idx].style.boxShadow =
      "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px";

    if (idx > 0) {
      loaderItem[idx - 1].style.transform = "scale(1)";
      loaderItem[idx - 1].style.boxShadow = "none";
    }
    if (idx == 0) {
      loaderItem[loaderItem.length - 1].style.transform = "scale(1)";
      loaderItem[loaderItem.length - 1].style.boxShadow = "none";
    }
    idx < loaderItem.length - 1 ? idx++ : (idx = 0);
  }, 300);

  let fragment = renderSlot();
  if (fragment) {
    setTimeout(() => {
      clearInterval(id);
      loader.style.display = "none";
      container.appendChild(fragment);
      container.style.display = "block";
      renderUI();
    }, 2000);
  }
})();

function createTimeSlot(time) {
  let text = "";
  if (time >= 10) {
    text = time <= 12 ? time + ":00 AM" : time + ":00 PM";
  } else {
    text = "0" + time + ":00 AM";
  }

  const slotContainer = document.createElement("div");
  const timeEle = document.createElement("p");
  const textToAdd = document.createTextNode(text);
  const meetingWrapper = document.createElement("div");
  const verticalLine = document.createElement("div");

  slotContainer.classList.add("time-slot");
  slotContainer.setAttribute("id", `slot-${time}`);
  timeEle.classList.add("time");
  meetingWrapper.classList.add("meeting-wrapper");
  verticalLine.classList.add("line");

  timeEle.appendChild(textToAdd);
  meetingWrapper.appendChild(verticalLine);
  slotContainer.appendChild(timeEle);
  slotContainer.appendChild(meetingWrapper);

  return slotContainer;
}

function createMeeting({ title, startTime, endTime, color }) {
  let time = startTime + " - " + endTime;

  let startHour = +startTime.split(":")[0];
  let startMin = +startTime.split(":")[1];
  let endHour = +endTime.split(":")[0];
  let endMin = +endTime.split(":")[1];

  const meeting = document.createElement("div");
  const meetingTitle = document.createElement("p");
  const titleNode = document.createTextNode(title);
  const timeEle = document.createElement("p");
  const timeToAdd = document.createTextNode(time);

  meeting.classList.add("scheduled-meeting");
  meeting.style.backgroundColor = color;
  let calcHeight =
    Math.abs(startHour - endHour) * 100 +
    (Math.abs(endMin - startMin) >= 30 ? 50 : 0);
  meeting.style.height = calcHeight + "px";
  meeting.style.top = (startMin / 60) * 100 + "px";

  meetingTitle.appendChild(titleNode);
  timeEle.appendChild(timeToAdd);
  meeting.appendChild(meetingTitle);
  meeting.appendChild(timeEle);

  return meeting;
}

const renderUI = () => {
  sampleData.forEach((item) => {
    let hours = +item.startTime.split(":")[0];
    const meetingWrapper = document.querySelector(
      `#slot-${hours} .meeting-wrapper`
    );
    const slot = createMeeting(item);
    meetingWrapper.appendChild(slot);
  });
};
