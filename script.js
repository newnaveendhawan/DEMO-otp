const DEMO_OTP = "123456";

const form = document.getElementById("phoneForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const sendBtn = document.getElementById("sendBtn");
const otpPanel = document.getElementById("otpPanel");
const otpInput = document.getElementById("otp");
const verifyBtn = document.getElementById("verifyBtn");
const resendBtn = document.getElementById("resendBtn");
const maskedPhone = document.getElementById("maskedPhone");
const message = document.getElementById("message");
const successPanel = document.getElementById("successPanel");
const welcome = document.getElementById("welcome");
const resetBtn = document.getElementById("resetBtn");

let currentPhone = "";
let currentName = "";

function showMessage(text = "") {
  message.textContent = text;
}

function validIndianPhone(value) {
  return /^[6-9]\d{9}$/.test(value);
}

function maskPhone(phone) {
  return "+91 " + phone.slice(0, 2) + "******" + phone.slice(-2);
}

function showOtpPanel() {
  otpPanel.classList.remove("hidden");
  form.classList.add("hidden");
  maskedPhone.textContent = maskPhone(currentPhone);
  otpInput.focus();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showMessage("");

  currentName = nameInput.value.trim();
  currentPhone = phoneInput.value.replace(/\D/g, "");

  if (currentName.length < 2) {
    showMessage("Please enter your full name.");
    return;
  }

  if (!validIndianPhone(currentPhone)) {
    showMessage("Enter a valid 10-digit Indian mobile number.");
    return;
  }

  sendBtn.disabled = true;
  showOtpPanel();
  showMessage("Demo OTP generated. Enter 123456.");
});

verifyBtn.addEventListener("click", () => {
  showMessage("");
  const otp = otpInput.value.trim();

  if (!/^\d{6}$/.test(otp)) {
    showMessage("Enter a valid 6-digit OTP.");
    return;
  }

  if (otp !== DEMO_OTP) {
    showMessage("Incorrect OTP. Please try again.");
    return;
  }

  otpPanel.classList.add("hidden");
  successPanel.classList.remove("hidden");
  welcome.textContent = `Welcome, ${currentName}. Your phone number ${maskPhone(currentPhone)} has been verified in this demo.`;
});

resendBtn.addEventListener("click", () => {
  otpInput.value = "";
  showMessage("Demo OTP resent. Enter 123456.");
  otpInput.focus();
});

resetBtn.addEventListener("click", () => {
  form.reset();
  otpInput.value = "";
  currentPhone = "";
  currentName = "";
  sendBtn.disabled = false;
  successPanel.classList.add("hidden");
  form.classList.remove("hidden");
  showMessage("");
  nameInput.focus();
});
