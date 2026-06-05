import { Component, computed, Input, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent implements OnInit, OnDestroy {

    @Input() slides: CarouselSlide[] = [
    {
      imageUrl: 'https://www.serenaart.com.ar/hs-fs/hubfs/banner%20web%2025%20de%20mayo%20-%20Serena%20copy.png?width=720&height=415&name=banner%20web%2025%20de%20mayo%20-%20Serena%20copy.png',
      title: '25 DE MAYO',
      subtitle: 'Día de la revolución de Mayo',
      text: 'Celebramos nuestras raíces e historia sumando seguridad para construir un futuro mejor.',
    },
    {
      imageUrl: 'https://www.serenaart.com.ar/hs-fs/hubfs/web-home-R1/SERENA.HOME.HEADER.001.png?width=913&height=544&name=SERENA.HOME.HEADER.001.png',
      title: 'TU BIENESTAR ASEGURADO',
      text: 'Porque el bienestar es la base del progreso.',
    },
    {
      imageUrl: 'https://www.serenaart.com.ar/hs-fs/hubfs/web-home-R1/SERENA.HOME.HEADER.004.png?width=913&height=544&name=SERENA.HOME.HEADER.004.png',
      title: 'CANALES DE AUTOGESTIÓN',
      text: 'Encontrá toda la información de tus gestiones en un solo lugar.',
      ctaLabel: 'SERENA ONLINE',
    },
    {
      imageUrl: 'https://www.serenaart.com.ar/hs-fs/hubfs/web-home-R1/SERENA.HOME.HEADER.002.png?width=913&height=544&name=SERENA.HOME.HEADER.002.png',
      title: 'CAPACITATE ONLINE',
      text: 'Cursos pensados para cuidar a tus trabajadores.',
      ctaLabel: 'INGRESAR',
      ctaLabel2: 'VER SEMINARIOS',
    },
    {
      imageUrl: 'https://www.serenaart.com.ar/hs-fs/hubfs/SERENA.HEADER.youtube.blanco.png?width=913&height=544&name=SERENA.HEADER.youtube.blanco.png',
      title: 'ENCONTRANOS EN YOUTUBE',
      text: '¡Suscribite al canal y enterate de todas nuestras capacitaciones!',
      ctaLabel: 'Visitanos',
    },
    {
      imageUrl: 'https://www.serenaart.com.ar/hs-fs/hubfs/web.carru.mapa%20(1).png?width=720&height=415&name=web.carru.mapa%20(1).png',
      title: 'CARTILLA MÉDICA',
      text: 'Consultá todos nuestros prestadores.',
      ctaLabel: 'VER CARTILLA',
    },
  ];
 
  @Input() autoplayInterval = 5000;
  @Input() showArrows = true;
 
  // Signal que guarda el índice activo — se actualiza de forma inmediata;
  // la transición CSS opacity se encarga de la animación sin colapsar el layout.
  currentIndex = signal(0);
 
  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
 
  ngOnInit(): void {
    this.startAutoplay();
  }
 
  ngOnDestroy(): void {
    this.stopAutoplay();
  }
 
  next(): void {
    this.resetAutoplay();
    this.currentIndex.update(i => (i + 1) % this.slides.length);
  }
 
  prev(): void {
    this.resetAutoplay();
    this.currentIndex.update(i => (i - 1 + this.slides.length) % this.slides.length);
  }
 
  selectSlide(index: number): void {
    if (index === this.currentIndex()) return;
    this.resetAutoplay();
    this.currentIndex.set(index);
  }
 
  private startAutoplay(): void {
    this.autoplayTimer = setInterval(() => this.next(), this.autoplayInterval);
  }
 
  private stopAutoplay(): void {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }
 
  private resetAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }
}

type CarouselSlide = {
   
  imageUrl  : string;
  title?    : string;
  subtitle? : string;
  text? : string;
  ctaLabel? : string;
  ctaLabel2? : string;
  ctaUrl?   : string;
 
};