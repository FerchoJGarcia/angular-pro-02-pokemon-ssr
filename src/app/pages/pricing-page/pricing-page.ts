import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPage implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    // if (!isPlatformServer(this.platform)) {
    //   document.title = 'Pricing Page';
    // }

    this.title.setTitle('Pricing Page ');
    this.meta.updateTag({ name: 'description', content: 'Este es el pricing page' });
    this.meta.updateTag({ name: 'og:title', content: 'pricing page' });
    this.meta.updateTag({ name: 'keywords', content: 'Angular, Curso, Fernando, García' });
  }
}
