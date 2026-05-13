import { useState } from "react";
import { useModal } from "@/context/ModalContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const countryToFlag: Record<string, string> = {
  Bangladesh: "🇧🇩",
  India: "🇮🇳",
  Pakistan: "🇵🇰",
  Nepal: "🇳🇵",
  "Sri Lanka": "🇱🇰",
};

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#a9acb4]" fill="none" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);
const AlertDot = () => (
  <span className="w-5 h-5 rounded-full bg-[#ff4000] flex items-center justify-center">
    <span className="text-white text-[10px] font-bold">!</span>
  </span>
);
const CheckDot = () => (
  <span className="w-5 h-5 rounded-full bg-[#00b24b] flex items-center justify-center">
    <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none">
      <path d="M2.5 7l3.5 3.5 5.5-6" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
);

type EditField =
  | null
  | "name"
  | "dateOfBirth"
  | "country"
  | "phone"
  | "email"
  | "password";

const COUNTRY_OPTIONS = ["Bangladesh", "India", "Pakistan", "Nepal", "Sri Lanka"];

export const SettingsModal = () => {
  const { closeModal, openModal } = useModal();
  const { user, updateProfile, changePassword, logout } = useAuth();
  const navigate = useNavigate();
  const [editingField, setEditingField] = useState<EditField>(null);
  const [draftValue, setDraftValue] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const profile = {
    name: user?.name ?? "PROZESY LTD",
    dateOfBirth: user?.dateOfBirth ?? "01/01/1990",
    country: user?.country ?? "Bangladesh",
    phone: user?.phone ?? "",
    email: user?.email ?? "prozesy@gmail.com",
  };

  const updateField = (field: "name" | "dateOfBirth" | "country" | "phone" | "email", value: string) => {
    const next = {
      ...profile,
      [field]: value,
    };
    return updateProfile(next);
  };

  const openEditor = (field: Exclude<EditField, null>) => {
    setEditingField(field);
    setError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    if (field === "password") {
      setDraftValue("");
      return;
    }

    const valueMap = {
      name: profile.name,
      dateOfBirth: profile.dateOfBirth,
      country: profile.country,
      phone: profile.phone,
      email: profile.email,
    };

    setDraftValue(valueMap[field]);
  };

  const closeEditor = () => {
    setEditingField(null);
    setError("");
  };

  const saveEditor = async () => {
    if (!editingField) return;

    if (editingField === "password") {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setError("All password fields are required");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("New password and confirm password do not match");
        return;
      }

      const result = await changePassword({ currentPassword, newPassword });
      if (!result.ok) {
        setError(result.message);
        return;
      }

      closeEditor();
      return;
    }

    const value = draftValue.trim();
    if (!value) {
      setError("This field cannot be empty");
      return;
    }

    const result = await updateField(editingField, value);
    if (!result.ok) {
      setError(result.message);
      return;
    }

    closeEditor();
  };

  const handleLogout = () => {
    logout();
    closeModal();
    navigate("/");
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="bg-white rounded-[24px] w-full max-w-[400px] mx-4 shadow-2xl font-inter max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3 sticky top-0 bg-white z-10">
          <button
            onClick={() => openModal("profile")}
            className="flex items-center gap-1 text-[#3b82f6] hover:text-[#2563eb] text-[14px] font-semibold transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <button
            onClick={closeModal}
            className="text-[#71717a] hover:text-[#18181b] w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f4f4f5] transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-5 pb-5 flex flex-col gap-5">
          <h2 className="text-[22px] font-bold text-[#141415]">Settings</h2>

          {/* Main data */}
          <div>
            <p className="text-[12px] font-medium text-[#6f7480] mb-2">Main data</p>
            <div className="bg-[#f0f2f5] rounded-[16px] overflow-hidden">
              <button type="button" onClick={() => openEditor("name")} className="flex items-center justify-between w-full px-4 py-3.5 border-b border-[rgba(0,0,0,0.06)] hover:bg-[#e8eaed] transition-colors">
                <span className="text-[14px] font-semibold text-[#141415]">Name</span>
                <div className="flex items-center gap-2 text-[14px] text-[#6f7480]">
                  {profile.name} <ChevronRight />
                </div>
              </button>
              <button type="button" onClick={() => openEditor("dateOfBirth")} className="flex items-center justify-between w-full px-4 py-3.5 border-b border-[rgba(0,0,0,0.06)] hover:bg-[#e8eaed] transition-colors">
                <span className="text-[14px] font-semibold text-[#141415]">Date of birth</span>
                <div className="flex items-center gap-2 text-[14px] text-[#6f7480]">
                  {profile.dateOfBirth} <ChevronRight />
                </div>
              </button>
              <button type="button" onClick={() => openEditor("country")} className="flex items-center justify-between w-full px-4 py-3.5 hover:bg-[#e8eaed] transition-colors">
                <span className="text-[14px] font-semibold text-[#141415]">Country of registration</span>
                <div className="flex items-center gap-2 text-[14px] text-[#6f7480]">
                  {profile.country} <span className="text-base">{countryToFlag[profile.country] ?? "🏳️"}</span>
                </div>
              </button>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <p className="text-[12px] font-medium text-[#6f7480] mb-2">Contact info</p>
            <div className="bg-[#f0f2f5] rounded-[16px] overflow-hidden mb-1">
              <button type="button" onClick={() => openEditor("phone")} className="flex items-center justify-between w-full px-4 py-3.5 hover:bg-[#e8eaed] transition-colors">
                <span className="text-[14px] font-semibold text-[#141415]">Phone number</span>
                {profile.phone ? <CheckDot /> : <AlertDot />}
              </button>
            </div>
            <p className="text-[13px] text-[#ff4000] font-medium px-1 mb-2">Verification required</p>
            <div className="bg-[#f0f2f5] rounded-[16px] overflow-hidden mb-1">
              <button type="button" onClick={() => openEditor("email")} className="flex items-center justify-between w-full px-4 py-3.5 hover:bg-[#e8eaed] transition-colors">
                <span className="text-[14px] font-semibold text-[#141415]">Email</span>
                <div className="flex items-center gap-2 text-[14px] text-[#6f7480]">
                  {profile.email} <CheckDot />
                </div>
              </button>
            </div>
            <p className="text-[13px] text-[#6f7480] px-1">
              To change confirmed data{" "}
              <button type="button" onClick={() => openModal("support")} className="text-[#3b82f6] font-semibold hover:underline">contact us</button>
            </p>
          </div>

          {/* Security */}
          <div>
            <p className="text-[12px] font-medium text-[#6f7480] mb-2">Security</p>
            <div className="bg-[#f0f2f5] rounded-[16px] overflow-hidden mb-1">
              <button type="button" onClick={() => openEditor("password")} className="flex items-center justify-between w-full px-4 py-3.5 hover:bg-[#e8eaed] transition-colors">
                <span className="text-[14px] font-semibold text-[#141415]">Password</span>
                <ChevronRight />
              </button>
            </div>
            <p className="text-[13px] text-[#6f7480] px-1">Enter your current password to make changes</p>
          </div>

          {/* Other settings */}
          <div>
            <p className="text-[12px] font-medium text-[#6f7480] mb-2">Other settings</p>
            <div className="bg-[#f0f2f5] rounded-[16px] overflow-hidden">
              <div className="flex items-center justify-between w-full px-4 py-3.5">
                <div>
                  <p className="text-[14px] font-semibold text-[#141415]">Active sessions</p>
                  <p className="text-[12px] text-[#6f7480]">Log out on other devices</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-[#ff4000] text-[14px] font-semibold hover:opacity-75 transition-opacity"
                >
                  End
                </button>
              </div>
            </div>
          </div>
        </div>

        {editingField ? (
          <div className="fixed inset-0 z-[2100] flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.45)" }}>
            <div className="bg-white rounded-[18px] w-full max-w-[340px] mx-4 p-4 shadow-2xl">
              <h3 className="text-[16px] font-semibold text-[#141415] mb-3">
                {editingField === "name" && "Edit name"}
                {editingField === "dateOfBirth" && "Edit date of birth"}
                {editingField === "country" && "Edit country"}
                {editingField === "phone" && "Edit phone number"}
                {editingField === "email" && "Edit email"}
                {editingField === "password" && "Change password"}
              </h3>

              {editingField === "country" ? (
                <select
                  value={draftValue}
                  onChange={(e) => setDraftValue(e.target.value)}
                  className="w-full border border-[#d7dbe2] rounded-xl px-3 py-2.5 text-[14px] text-[#141415] outline-none"
                >
                  {COUNTRY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : null}

              {editingField && editingField !== "country" && editingField !== "password" ? (
                <input
                  type="text"
                  value={draftValue}
                  onChange={(e) => setDraftValue(e.target.value)}
                  className="w-full border border-[#d7dbe2] rounded-xl px-3 py-2.5 text-[14px] text-[#141415] outline-none"
                />
              ) : null}

              {editingField === "password" ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full border border-[#d7dbe2] rounded-xl px-3 py-2.5 text-[14px] text-[#141415] outline-none"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full border border-[#d7dbe2] rounded-xl px-3 py-2.5 text-[14px] text-[#141415] outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-[#d7dbe2] rounded-xl px-3 py-2.5 text-[14px] text-[#141415] outline-none"
                  />
                </div>
              ) : null}

              {error ? (
                <p className="text-[12px] text-[#ff4000] mt-2">{error}</p>
              ) : null}

              <div className="flex gap-2 mt-4">
                <button
                  type="button"
                  onClick={closeEditor}
                  className="flex-1 bg-[#f0f2f5] hover:bg-[#e8eaed] text-[#141415] text-[13px] font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveEditor}
                  className="flex-1 bg-[#00b24b] hover:bg-[#008c3b] text-white text-[13px] font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
