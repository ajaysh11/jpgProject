import { Component, Input, Output, EventEmitter } from '@angular/core';
import dpi from 'dpi.js';
import { ImageType, Point } from './Image.model';

@Component({
  selector: 'image-root',
  templateUrl: './Image.component.html',
})
export class ImageComponent {
  @Input() data: ImageType = {
    id: '',
    img: '',
  };

  @Output() calcDistance = new EventEmitter<{
    id: string;
    name: string;
    point: Point[];
    distance: number;
  }>();

  points: Point[] = [];
  distance: number = 0;


  drawPointer(num: number) {
    let pointerElement: HTMLElement = document.createElement('div');
    pointerElement.classList.add('pointerWrapper');
    pointerElement.innerHTML =
      '<div class="piece1"></div><div class="piece2"></div><div class="piece3"></div><div class="piece4"></div>';

    if (num === 1) {
      pointerElement.classList.add('backOrange');
      pointerElement.style.left = `${this.points[0].clientX - 6}px`;
      pointerElement.style.top = `${this.points[0].clientY - 6}px`;
      document.getElementById(`line${this.data.id}`)?.remove();
      document.querySelectorAll('.pointerWrapper').forEach((item) => {
        item.remove();
      });
      let lineEle = document.createElement('div');
      lineEle.classList.add('line');
      lineEle.id = `line${this.data.id}`;
      lineEle.style.display = 'none';
      document
        .getElementById(`loadedImgWrapper${this.data.id}`)
        ?.append(lineEle);
    } else {
      pointerElement.classList.add('backGreen');
      pointerElement.style.left = `${this.points[1].clientX - 6}px`;
      pointerElement.style.top = `${this.points[1].clientY - 6}px`;
    }
    document
      .getElementById(`loadedImgWrapper${this.data.id}`)
      ?.append(pointerElement);
  }

  handleMouseMove(event: MouseEvent) {
    if (this.points.length === 1) {
      let lineEle = document.getElementById(`line${this.data.id}`);
      if (!lineEle) {
        return;
      }
      lineEle.style.display = 'inline';
      lineEle.style.left = `${this.points[0].clientX}px`;
      lineEle.style.top = `${this.points[0].clientY}px`;
      const imageHeight = document.getElementById(
        `loadedImg${this.data.id}`
      )?.offsetHeight;
      if (!imageHeight) {
        return alert('Something was wrong! Reload this page and Try again.');
      }
      lineEle.style.bottom = `${imageHeight - event.offsetY}px`;

    }
  }

  handleClick(event: MouseEvent) {
    let bounds = document
      .querySelector(`#loadedImg${this.data.id}`)
      ?.getBoundingClientRect();
    if (!bounds) {
      return alert(
        'Image is loaded incorrectly or Your browswer not support bounding.'
      );
    }
    let clientX = event.offsetX;
    let clientY = event.offsetY;
    let x = clientX - bounds.left;
    let y = clientY - bounds.top;
    if (this.points.length === 0) {
      this.points.push({
        x,
        y,
        clientX,
        clientY,
      });
      this.drawPointer(1);
    } else if (this.points.length === 1) {
      this.points.push({
        x: this.points[0].x,
        y,
        clientX: this.points[0].clientX,
        clientY,
      });
      this.drawPointer(2);
      const DPI = dpi();
      const distance = (2.54 / DPI.y) * (this.points[1].y - this.points[0].y);
      const imageName = this.data.img.split('/').pop() || '';
      this.calcDistance.emit({
        id: this.data.id,
        name: imageName,
        point: this.points,
        distance,
      });
      console.log(distance);
    } else {
      this.points = [];
      this.points.push({
        x,
        y,
        clientX,
        clientY,
      });
      this.drawPointer(1);
    }
  }
}
