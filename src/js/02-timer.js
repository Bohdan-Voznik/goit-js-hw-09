import flatpickr from "flatpickr";
import '.'

new flatpickr('#datetime-picker', {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
});