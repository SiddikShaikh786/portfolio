import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  public isLoading = false;
  constructor(private loader: LoaderService, private cdr: ChangeDetectorRef) {
    this.loader.isLoading.subscribe((loading) => {
      this.isLoading = loading;
      this.cdr.detectChanges();
    });
  }
}
