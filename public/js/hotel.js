const asciValue = {
    kolkata: 743,
    mumbai: 635,
    chennai: 726,
    delhi: 518,
  };
  
  addHeading();
  
  function addHeading() {
    const hotel = localStorage.getItem("hotel");
    // console.log(hotel)
    let data = JSON.parse(localStorage.getItem("data"));
    data = data[hotel.toLocaleLowerCase()]["Hotel"];
    // console.log(data)
  
    //form Heading
    document.querySelector(
      "#heading>h1"
    ).innerText = `${hotel} Hotels and Places to Stay`;
  
    //hotels heading
    document.querySelector(
      "#text>h2"
    ).innerText = `Popular hotels in ${hotel} right now`;
  
    //cities hotels images
    const caroImage = document.querySelector("#Catagries");
    data.forEach((element, index) => {
      if (index < 3) {
        // console.log(element["image"]["image3"])
        const img = document.createElement("img");
        img.setAttribute("src", element["image"]["image3"]);
        const div = document.createElement("div");
        div.append(img);
  
        caroImage.append(div);
      }
    });
  
    //list of hotels
    const hotelList = document.querySelector("#hotel");
    data.forEach((element) => {
      //image div
      const img = document.createElement("img");
      img.setAttribute("src", element["image"]["image1"]);
  
      const div1 = document.createElement("div");
      div1.setAttribute("class", "image");
      div1.append(img);
  
      //heading div
      const h2 = document.createElement("h2");
      h2.innerText = element.name;
  
      const div2_1 = document.createElement("div");
      div2_1.setAttribute("class", "hotelName");
      div2_1.append(h2);
  
      //deatils div - div1
      const icon = document.createElement("img");
      icon.setAttribute("src", element.icon_link);
  
      const details_h2 = document.createElement("h2");
      const fare = calculateFare(hotel, element.name);
      details_h2.innerText = `Rs.${fare}`;
  
      const btn = document.createElement("button");
      btn.innerText = "View Deal";
      btn.setAttribute("class", "ViewDealBtn");
  
      const link = document.createElement("a");
      link.setAttribute("href", element.hotel_link); //element.hotel_link
      link.append(btn);
  
      const p1 = document.createElement("p");
      p1.innerText = "✓Free cancelliation";
  
      const p2 = document.createElement("p");
      p2.innerText = "✓Reserve now, pay at stay";
  
      const d1 = document.createElement("div");
      d1.append(icon, details_h2, link, p1, p2);
  
      //deatils div - div2
      const p31 = document.createElement("p");
      p31.innerText = "Agoda.com";
  
      const h41 = document.createElement("h4");
      h41.innerText = `Rs.${fare}`;
  
      const p32 = document.createElement("p");
      p32.innerText = "Hotels.com";
  
      const h42 = document.createElement("h4");
      h42.innerText = `Rs.${fare}`;
  
      const p33 = document.createElement("p");
      p33.innerText = "Trip.com";
  
      const h43 = document.createElement("h4");
      h43.innerText = `Rs.${fare}`;
  
      const hr = document.createElement("hr");
  
      const all4 = document.createElement("h4");
      all4.innerText = "View all 14 deals from";
  
      const h44 = document.createElement("h4");
      h44.innerText = `Rs.${fare}`;
  
      const d2 = document.createElement("div");
      d2.append(p31, h41, p32, h42, p33, h43, hr, all4, h44);
  
      //deatils div - div3
      const p_span1 = document.createElement("span");
      p_span1.innerText = element["rating"]["review"];
  
      const rating = document.createElement("p");
      rating.innerText = "★★★★☆";
      rating.append(p_span1);
  
      const p_span2 = document.createElement("span");
      p_span2.innerText = `#1 Best Value in ${hotel} that matches your filters`;
  
      const filter = document.createElement("p");
      filter.append(p_span2);
  
      const wifi_icon = document.createElement("i");
      wifi_icon.className = "fa-solid fa-wifi";
  
      const wifi = document.createElement("h5");
      wifi.innerText = "Free Wifi";
      wifi.append(wifi_icon);
  
      const parking_icon = document.createElement("i");
      parking_icon.className = "fa-solid fa-square-parking";
  
      const parking = document.createElement("h5");
      parking.innerText = "Free Parking";
      parking.append(parking_icon);
  
      const safety_icon = document.createElement("i");
      safety_icon.className = "fa-solid fa-hands-clapping";
  
      const safety = document.createElement("h5");
      safety.innerText = "Taking safety measures";
      safety.append(safety_icon);
  
      const d3 = document.createElement("div");
      d3.append(rating, filter, wifi, parking, safety);
  
      //details div
      const div2_2 = document.createElement("div");
      div2_2.setAttribute("class", "otherInfo");
      div2_2.append(d1, d2, d3);
  
      //
      const div2 = document.createElement("div");
      div2.setAttribute("class", "details");
      div2.append(div2_1, div2_2);
  
      const div = document.createElement("div");
      div.setAttribute("class", "hotelDeal");
      div.append(div1, div2);
  
      hotelList.append(div);
    });
  }
  
  function calculateFare(hotel, name) {
    const val =
      calculateAsciiValue(name) + asciValue[hotel.toLocaleLowerCase()] * 2;
    return val;
  }
  
  function calculateAsciiValue(str) {
    let count = 0;
    // console.log(str)
    for (let i = 0; i < str.length; i++) {
      count += str.charCodeAt(i);
    }
    // console.log(count)
    return count * 2;
  }