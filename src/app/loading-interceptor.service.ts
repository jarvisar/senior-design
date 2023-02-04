import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private loadingService: LoadingService) { }

  // Intercept HTTP requests
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.shouldExcludeRequest(request)) {
      return next.handle(request);
    }
    
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests === 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }

  private shouldExcludeRequest(request: HttpRequest<any>) {
    const excludeUrl = 'https://cors-proxy-phi.vercel.app/proxy?query=select+pl_name,hostname,discoverymethod,disc_year,disc_facility,disc_refname,pl_controv_flag,sy_snum,sy_pnum,sy_mnum,cb_flag,rastr,decstr,st_spectype,ra,dec,pl_orbper,pl_rade,pl_bmasse,sy_dist,pl_orbsmax,pl_orbeccen,pl_dens+from+pscomppars&format=json';
    return request.url === excludeUrl;
  }
}