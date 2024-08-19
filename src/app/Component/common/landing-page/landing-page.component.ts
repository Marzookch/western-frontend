import { Component, HostListener, OnInit } from '@angular/core';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit   {
  

  ngOnInit(): void {
    this.initParallax();
  }

  initParallax(): void {
    const parallaxElements = document.querySelectorAll('.parallax-background');
    
    window.addEventListener('scroll', () => {
      parallaxElements.forEach((element: any) => {
        const speed = element.dataset.speed;
        const yOffset = window.pageYOffset * speed;
        element.style.transform = `translateY(${yOffset}px)`;
      });
    });
  }

}
