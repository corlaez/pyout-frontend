import * as ko from "knockout";
import template from "./PlatformPicker.html";
import { connect, Connect } from "../overko";
import { PlatformOption } from "../overko/state";

class PlatformPickerVM {
  checkPlatform: ko.ObservableArray<string>;
  options: ko.ObservableArray<PlatformOption>;
  message: ko.Computed<string>;

  constructor(props: Connect) {
    const self = this;
    self.checkPlatform = props.overko.state.platform.checkPlatform;
    self.options = props.overko.state.platform.options;
    self.message = ko.computed(() =>
      self
        .options()
        .filter(o => self.checkPlatform().includes(o.value))
        .map(o => o.name)
        .join(", ")
    );
  }
}

export const registerPlatformPicker = () => {
  const config: ko.components.Config = {
    viewModel: connect(PlatformPickerVM),
    template
  };
  ko.components.register("platform-picker", config);
};

export default PlatformPickerVM;
