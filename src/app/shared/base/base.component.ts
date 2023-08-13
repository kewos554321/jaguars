import { Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { NGXLogger } from "ngx-logger";
import { ConfirmationService } from "primeng/api";

export class BaseComponent {

  // logger: NGXLogger;
  // routeStateService: RouteStateService;
  // toastService: ToastService;
  // loader: LoaderService;
  // translateService: TranslateService;
  // laasSetting: LaasSettingService;
  confirmationService: ConfirmationService;
  // cacheService: CacheService;

  constructor(injector: Injector) {
    // this.logger = injector.get(NGXLogger);
    // this.routeStateService = injector.get(RouteStateService);
    // this.toastService = injector.get(ToastService);
    // this.loader = injector.get(LoaderService);
    // this.translateService = injector.get(TranslateService);
    // this.laasSetting = injector.get(LaasSettingService);
    this.confirmationService = injector.get(ConfirmationService);
    // this.cacheService = injector.get(CacheService);
  }

}
