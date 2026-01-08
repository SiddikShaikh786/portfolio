import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class LoaderService {

    private breadCrumbsSubject = new Subject();
    breadCrumbs$ = this.breadCrumbsSubject.asObservable();

    public broadcastBreadCrumbs(breadCrumbs: any) {
        this.breadCrumbsSubject.next(breadCrumbs);
    }

    public isLoading = new Subject<boolean>();
    private inFlightHttpCalls: string[] = [];

    public show() {
        this.isLoading.next(true);
    }

    public hide() {
        this.isLoading.next(false);
    }

    private addInflightHttpRequest(url: string) {
        if (!this.isAnyHttpRequestPending()) {
            // Show loader when first http request starts
            this.show();
        }
        this.inFlightHttpCalls.push(url);
    }

    private removeCompletedHttpRequest(url: string) {
        this.inFlightHttpCalls = this.inFlightHttpCalls.filter((inFlightUrl) => inFlightUrl !== url);
        // hiding the loader, only if all the requests are completed.
        if (!this.isAnyHttpRequestPending()) {
            this.hide();
        }
    }

    private isAnyHttpRequestPending() {
        return this.inFlightHttpCalls.length > 0;
    }

    public serviceStarted(url: string) {
        this.addInflightHttpRequest(url);
    }

    public serviceCompleted(url: string) {
        this.removeCompletedHttpRequest(url);
    }
}
