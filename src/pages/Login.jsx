import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { loginWithPin } from "../api/auth";
import { toast } from "react-hot-toast";

export default function Login() {
  const { t } = useTranslation();
  const [mobile, setMobile] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const unlockAudio = () => {
    const audio = new Audio("/ringtones/alert.mp3");

    audio
      .play()
      .then(() => {
        audio.pause();
        audio.currentTime = 0;
        console.log("Audio unlocked");
      })
      .catch(() => {});
  };

  const onPinLogin = async () => {
    if (!mobile) return toast.error(t("login.pleaseEnterMobile"));
    if (!validateMobile(mobile))
      return toast.error(t("login.pleaseEnterValidMobile"));
    if (!pin) return toast.error(t("login.pleaseEnterPin"));

    try {
      setLoading(true);
      const res = await loginWithPin(mobile, pin);
      const { success, message, token, user } = res?.data || {};

      if (!success || !token || !user) {
        throw new Error(message || "Invalid login response");
      }

      // Persist auth & user
      localStorage.setItem("access_token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(t("login.loginSuccessful"));
      unlockAudio();

      // Notify app & redirect
      window.dispatchEvent(new Event("auth-updated"));
      // Redirect based on role
      switch (user.role) {
        case "ADMIN":
          window.location.replace("/admin/dashboard");
          break;
        case "USER":
          window.location.replace("/user/home");
          break;
        case "EXECUTIVE":
          window.location.replace("/executive/onboarding");
          break;
        case "MANAGER":
          window.location.replace("/manager/team");
          break;
        default:
          window.location.replace("/");
      }

      // window.location.replace('/')
    } catch (e) {
      const errorMessage =
        e?.response?.data?.message || e?.message || t("login.pinLoginFailed");
      if (
        errorMessage.includes("not found") ||
        errorMessage.includes("invalid")
      ) {
        toast.error(t("login.driverNotFound"));
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">
      <div className="login-hero">
        <div style={{ textAlign: "center", color: "#fff" }}>
          <img alt="logo" src="/jk.png" />
          <h1 className="bold-text" style={{ marginTop: 16, color: "#fff" }}>
            PWA
          </h1>
        </div>
      </div>

      <div className="login-panel">
        <div className="panel-body">
          <h2 className="login-welcome">{t("login.welcomeUser")}</h2>
          <small className="login-follow">{t("login.completeDetails")}</small>

          <div className="login-form">
            <div className="stack">
              <label className="login-mobile-label">
                {t("login.mobileNumber")}
              </label>
              <div className="row">
                <select
                  className="input"
                  style={{ maxWidth: 84 }}
                  defaultValue="+91"
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                </select>
                <input
                  className="input"
                  placeholder={t("login.enterMobileNumber")}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  maxLength={10}
                />
              </div>
            </div>

            <div className="stack">
              <label className="login-pin-label">{t("login.enterPin")}</label>
              <input
                type="password"
                className="input"
                placeholder={t("login.enterPin")}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                disabled={loading}
              />
            </div>

            <button
              className={`login-continue-btn ${loading ? "btn-loading" : ""}`}
              onClick={onPinLogin}
              disabled={loading}
            >
              {loading ? t("login.loggingIn") : t("login.continue")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
