import { Component, ViewChild } from '@angular/core';
import { NgxCaptureService } from 'ngx-capture';
import { Point } from './components/Image.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'JPGProject';
  ImGDownload: any ;
  @ViewChild('capture', {static: false}) capture: any;
  imgBase64 = '';

  images = [
    { id: '1', img: '../assets/images/X001.jpg' },
    { id: '2', img: '../assets/images/x002.jpg' },
    { id: '3', img: '../assets/images/x003.jpg' },
    { id: '4', img: '../assets/images/X004.jpg' },
    { id: '5', img: '../assets/images/X005.jpg' },
    { id: '6',  img: '../assets/images/X006.jpg' },
    { id: '7', img: '../assets/images/X007.jpg' },
    { id: '8', img: '../assets/images/X008.jpg' },
    { id: '9', img: '../assets/images/x009.jpg' },
    { id: '10', img: '../assets/images/x010.jpg' },
    { id: '11', img: '../assets/images/x012.jpg' },
    { id: '12', img: '../assets/images/x013.jpg' },
    { id: '13', img: '../assets/images/x014.jpg' },
    { id: '14', img: '../assets/images/x002 (2).jpg' },
    { id: '15', img: '../assets/images/x003 (2).jpg' },
    { id: '16', img: '../assets/images/x004 (2).jpg' },
    { id: '17', img: '../assets/images/X005 (2).jpg' },
    { id: '18', img: '../assets/images/X006 (2).jpg' },
    { id: '19', img: '../assets/images/X008 (2).jpg' },
    { id: '20', img: '../assets/images/x009 (2).jpg' },
    { id: '21', img: '../assets/images/x010 (2).jpg' },
    { id: '22', img: '../assets/images/x012 (2).jpg' },
    { id: '23', img: '../assets/images/x013 (2).jpg' },
    { id: '24', img: '../assets/images/x014 (2).jpg' },
    { id: '25', img: '../assets/images/x015 (2).jpg' },
    { id: '26', img: '../assets/images/x010 (3).jpg' },
    { id: '27', img: '../assets/images/x012 (2).jpg' },
    { id: '28', img: '../assets/images/x013 (2).jpg' },
  ];

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    draggable: false,
  };

  csv = [
    ['Id', 'ImageName', 'FirstX', 'FirstY', 'SecondX', 'SecondY', 'Distance'],
  ];

  constructor(private captureService: NgxCaptureService){

  }

  handleCalcDistance = (event: {
    id: string;
    name: string;
    point: Point[];
    distance: number;
  }, i:any) => {
    this.ImGDownload = i;
    const idx = this.csv.findIndex((li) => li[0] === event.id);
    if (idx !== -1) {
      this.csv[idx] = [
        event.id,
        event.name,
        `${event.point[0].clientX}`,
        `${event.point[0].clientY}`,
        `${event.point[1].clientX}`,
        `${event.point[1].clientY}`,
        `${event.distance}`,
      ];
      return;
    }
    this.csv.push([
      event.id,
      event.name,
      `${event.point[0].clientX}`,
      `${event.point[0].clientY}`,
      `${event.point[1].clientX}`,
      `${event.point[1].clientY}`,
      `${event.distance}`,
    ]);
  };

  handleExportCsv = () => {
    let csvContent =
      'data:text/csv;charset=utf-8,' +
      this.csv.map((e) => e.join(',')).join('\n');
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'my_data.csv');
    document.body.appendChild(link); 
    link.click();
  };

  downloadImage(){
    console.log(this.capture.nativeElement);
    
    this.captureService
    .getImage(this.capture.nativeElement, true).toPromise()
    .then((img: any) => {
      this.imgBase64 = img;
      this.downloadJson();
    });
  }

  afterChange(e: any) {
    this.ImGDownload = '';
  }

  downloadJson() {
    var element = document.createElement('a');
    element.setAttribute('href', this.imgBase64);
    element.setAttribute('download', this.images[this.ImGDownload].id+'.png');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  } 
}
