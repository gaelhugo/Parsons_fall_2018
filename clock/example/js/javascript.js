
var imageNames1 =
    ['image/1.jpg', 'image/2.jpg', 'image/3.jpg', 'image/4.jpg', 'image/5.jpg'];
var imageNames2 = [
  'image2/1.jpg', 'image2/2.jpg', 'image2/3.jpg', 'image2/4.jpg',
  'image2/5.jpg', 'image2/6.jpg'
];
var imageNames3 = [
  'image3/1.jpg', 'image3/2.jpg', 'image3/3.jpg', 'image3/4.jpg', 'image3/5.jpg'
];
var imageNames4 = [
  'image4/1.jpg', 'image4/2.jpg', 'image4/3.jpg', 'image4/4.jpg', 'image4/5.jpg'
];
var imageNames5 = ['image5/1.jpg', 'image5/2.jpg'];
var imageNames6 = [
  'image6/1.jpg', 'image6/2.jpg', 'image6/3.jpg', 'image6/4.jpg',
  'image6/5.jpg', 'image6/6.jpg', 'image6/7.jpg'
];
var imageNames7 = [
  'image7/1.jpg', 'image7/2.jpg', 'image7/3.jpg', 'image7/4.jpg', 'image7/5.jpg'
];
var imageNames8 = [
  'image8/1.jpg', 'image8/2.jpg', 'image8/3.jpg', 'image8/4.jpg',
  'image8/5.jpg', 'image8/6.jpg', 'image8/7.jpg'
];
var imageNames9 = [
  'image9/1.jpg', 'image9/2.jpg', 'image9/3.jpg', 'image9/4.jpg', 'image9/5.jpg'
];
var imageNames10 = [
  'image10/1.jpg', 'image10/2.jpg', 'image10/3.jpg', 'image10/4.jpg',
  'image10/5.jpg'
];
var imageNames11 =
    ['image11/1.jpg', 'image11/2.jpg', 'image11/3.jpg', 'image11/4.jpg'];
var imageNames12 = ['image12/1.jpg', 'image12/2.jpg', 'image12/3.jpg'];
var imageNames13 = [
  'image13/1.jpg', 'image13/2.jpg', 'image13/3.jpg', 'image13/4.jpg',
  'image13/5.jpg', 'image13/6.jpg'
];
var imageNames14 =
    ['image14/1.jpg', 'image14/2.jpg', 'image14/3.jpg', 'image14/4.jpg'];
var imageNames15 = [
  'image15/1.jpg', 'image15/2.jpg', 'image15/3.jpg', 'image15/4.jpg',
  'image15/5.jpg', 'image15/6.jpg'
];
var imageNames16 = [
  'image16/1.jpg', 'image16/2.jpg', 'image16/3.jpg', 'image16/4.jpg',
  'image16/5.jpg', 'image16/6.jpg', 'image16/7.jpg'
];
var imageNames17 =
    ['image17/1.jpg', 'image17/2.jpg', 'image17/3.jpg', 'image17/4.jpg'];
var imageNames18 = [
  'image18/1.jpg', 'image18/2.jpg', 'image18/3.jpg', 'image18/4.jpg',
  'image18/5.jpg', 'image18/6.jpg'
];
var imageNames19 = ['image19/1.jpg', 'image19/2.jpg', 'image19/3.jpg'];
var imageNames20 = ['image20/1.jpg', 'image20/2.jpg', 'image20/3.jpg'];
var imageNames21 = ['image21/1.jpg', 'image21/2.jpg', 'image21/3.jpg'];
var imageNames22 = ['image22/1.jpg', 'image22/2.jpg'];
var imageNames23 =
    ['image23/1.jpg', 'image23/2.jpg', 'image23/3.jpg', 'image23/4.jpg'];
var imageNames24 =
    ['image24/1.jpg', 'image24/2.jpg', 'image24/3.jpg', 'image24/4.jpg'];

var imageChoice1, imageChoice2, imageChoice3, imageChoice4, imageChoice5,
    imageChoice6, imageChoice7, imageChoice8, imageChoice9, imageChoice10,
    imageChoice11, imageChoice12, imageChoice13, imageChoice14, imageChoice15,
    imageChoice16, imageChoice17, imageChoice18, imageChoice19, imageChoice20,
    imageChoice21, imageChoice22, imageChoice23, imageChoice24;

function randomizeAll() {
  imageChoice1 = choice(imageNames1);
  imageChoice2 = choice(imageNames2);
  imageChoice3 = choice(imageNames3);
  imageChoice4 = choice(imageNames4);
  imageChoice5 = choice(imageNames5);
  imageChoice6 = choice(imageNames6);
  imageChoice7 = choice(imageNames7);
  imageChoice8 = choice(imageNames8);
  imageChoice9 = choice(imageNames9);
  imageChoice10 = choice(imageNames10);
  imageChoice11 = choice(imageNames11);
  imageChoice12 = choice(imageNames12);
  imageChoice13 = choice(imageNames13);
  imageChoice14 = choice(imageNames14);
  imageChoice15 = choice(imageNames15);
  imageChoice16 = choice(imageNames16);
  imageChoice17 = choice(imageNames17);
  imageChoice18 = choice(imageNames18);
  imageChoice19 = choice(imageNames19);
  imageChoice20 = choice(imageNames20);
  imageChoice21 = choice(imageNames21);
  imageChoice22 = choice(imageNames22);
  imageChoice23 = choice(imageNames23);
  imageChoice24 = choice(imageNames24);
  console.log('RANDOMIZE ALL');
}


function choice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


function hexClock() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDay() + 7;

  if (day < 10) {
    day = '0' + day;
  }

  var arr2 = year + '-' + month + '-' + day;

  var hour = date.getHours();
  // var hour2 = date.getHours();

  if (hour < 10) {
    hour = '0' + hour;
  }

  var minute = date.getMinutes();

  if (minute < 10) {
    minute = '0' + minute;
  }

  var second = date.getSeconds();

  if (second < 10) {
    second = '0' + second;
  }

  var arr3 = hour + ':' + minute + ':' + second;

  $('#date').text(arr2)
  $('#date2').text(arr3)


  var seconds = document.getElementById(seconds);


  var secondsStr = (100 - date.getSeconds() * 1.6).toString();
  // if (secondsStr.length < 2) {
  //     secondsStr = '0' + secondsStr;
  //   }
  // var hexColorStrSeconds = 'brightness' + '('+ secondsStr + '%' + ')';
  var secondsStr2 = date.getSeconds();
  var hexColorStrSeconds = 'grayscale(' + secondsStr + '%)';


  document.getElementById('mainImage').style.filter = hexColorStrSeconds;

  // console.log(secondsStr2);
  //
  // if (hexColorStrSeconds == 'grayscale(100%)') {
  //   location.reload();
  // }
  console.log(second);
  if (second == '00') {
    randomizeAll();
  }

  if (hour >= 24 || hour < 1) {
    $('#text1').text('立春 Lichun')
    $('#text2').text('Feb 4th, Start of Spring')
    $('#mainImage').attr('src', imageChoice1)


  } else if (hour >= 1 && hour < 2) {
    $('#text1').text('雨水 Yushui')
    $('#text2').text('Feb 19th, Indicates an increase in rain')
    $('#mainImage').attr('src', imageChoice2)
  } else if (hour >= 2 && hour < 3) {
    $('#text1').text('驚蟄 Jingzhe')
    $('#text2').text('Mar 6th, Animals are woken by thunder from hibernation')
    $('#mainImage').attr('src', imageChoice3)
  } else if (hour >= 3 && hour < 4) {
    $('#text1').text('春分 Chunfen')
    $('#text2').text('Mar 21st, Half of spring')
    $('#mainImage').attr('src', imageChoice4)
  } else if (hour >= 4 && hour < 5) {
    $('#text1').text('清明 Qingming')
    $('#text2').text(
        'Apr 5th, Everything grows at this time, it is clean and clear')
    $('#mainImage').attr('src', imageChoice5)
  } else if (hour >= 5 && hour < 6) {
    $('#text1').text('穀雨 Guyu')
    $('#text2').text(
        'Apr 20th, The end of winter, conducive to the growth of cereal crops')
    $('#mainImage').attr('src', imageChoice6)
  } else if (hour >= 6 && hour < 7) {
    $('#text1').text('立夏 Lixia')
    $('#text2').text('May 5th, The arrival of summer')
    $('#mainImage').attr('src', imageChoice7)
  } else if (hour >= 7 && hour < 8) {
    $('#text1').text('小滿 Xiaoman')
    $('#text2').text('May 21st, The crops becoming full')
    $('#mainImage').attr('src', imageChoice8)
  } else if (hour >= 8 && hour < 9) {
    $('#text1').text('芒種 Mangzhong')
    $('#text2').text('Jun 6th, The weather gradually turns into dry heat')
    $('#mainImage').attr('src', imageChoice9)
  } else if (hour >= 9 && hour < 10) {
    $('#text1').text('夏至 Xiazhi')
    $('#text2').text('Jun 21st, Longest hours of daylight')
    $('#mainImage').attr('src', imageChoice10)
  } else if (hour >= 10 && hour < 11) {
    $('#text1').text('小暑 Xiaoshu')
    $('#text2').text('Jul 7th, The weather is hot, but yet reach the peak')
    $('#mainImage').attr('src', imageChoice11)
  } else if (hour >= 11 && hour < 12) {
    $('#text1').text('大暑 Dashu')
    $('#text2').text('Jul 23rd, The hottest period of the year')
    $('#mainImage').attr('src', imageChoice12)
  } else if (hour >= 12 && hour < 13) {
    $('#text1').text('立秋 Liqiu')
    $('#text2').text('Aug 7th, The arrival of Fall')
    $('#mainImage').attr('src', imageChoice13)
  } else if (hour >= 13 && hour < 14) {
    $('#text1').text('處暑 Chushu')
    $('#text2').text('Aug 23rd, The end of summer')
    $('#mainImage').attr('src', imageChoice14)
  } else if (hour >= 14 && hour < 15) {
    $('#text1').text('白露 Bailu')
    $('#text2').text('Sep 8th, The weather is getting colder')
    $('#mainImage').attr('src', imageChoice15)
  } else if (hour >= 15 && hour < 16) {
    $('#text1').text('秋分 Qiufen')
    $('#text2').text('Sep 23rd, Half of Fall')
    $('#mainImage').attr('src', imageChoice16)
  } else if (hour >= 16 && hour < 17) {
    $('#text1').text('寒露 Hanlu')
    $('#text2').text('Oct 8th, There are many dew on the leaves in the morning')
    $('#mainImage').attr('src', imageChoice17)
  } else if (hour >= 17 && hour < 18) {
    $('#text1').text('霜降 Shuangjiang')
    $('#text2').text('Oct 23rd, Begins to frost')
    $('#mainImage').attr('src', imageChoice18)
  } else if (hour >= 18 && hour < 19) {
    $('#text1').text('立冬 Lidong')
    $('#text2').text('Nov 7th, The arrival of Winter')
    $('#mainImage').attr('src', imageChoice19)
  } else if (hour >= 19 && hour < 20) {
    $('#text1').text('小雪 Xiaoxue')
    $('#text2').text('Nov 22nd, Start snowing')
    $('#mainImage').attr('src', imageChoice20)
  } else if (hour >= 20 && hour < 21) {
    $('#text1').text('大雪 Daxue')
    $('#text2').text('Dec 7th, Snow begins to acuumulate')
    $('#mainImage').attr('src', imageChoice21)
  } else if (hour >= 21 && hour < 22) {
    $('#text1').text('冬至 Dongzhi')
    $('#text2').text('Dec 22nd, Shortest hours of daylight')
    $('#mainImage').attr('src', imageChoice22)
  } else if (hour >= 22 && hour < 23) {
    $('#text1').text('小寒 Xiaohan')
    $('#text2').text('Jan 5th, Cold')
    $('#mainImage').attr('src', imageChoice23)
  } else if (hour >= 23 && hour < 24) {
    $('#text1').text('大寒 Dahan')
    $('#text2').text('Jan 20th, The coldest time of the year')
    $('#mainImage').attr('src', imageChoice24)
  }
}

randomizeAll();
hexClock();
setInterval(hexClock, 1000);



// function hexClock2() {
// var date2 = new Date();
// var hour2 = date2.getHours();
// var refresh = date2.getSeconds();
// var secondsStr2 = date2.getSeconds();
// console.log(secondsStr2);
// if(secondsStr2 >= 60){
// 	location.reload();
// }
// function replaceDoc()
// {
// 	window.location.reload();
// }
// if(secondsStr2 == 100){
// 	replaceDoc();
// }
// if(graydegree >= 96){
// 	location.reload();
// 	}



// }

// hexClock2();
// setInterval(hexClock2, 1000);
