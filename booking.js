const form = document.querySelector("#booking-form");
const status = document.querySelector("#form-status");
const button = document.querySelector("#send-booking");
const accessKey = form.elements.namedItem("access_key").value.trim();

if (accessKey) {
  status.textContent = "";
  button.disabled = false;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (button.disabled) return;

  button.disabled = true;
  status.textContent = "Je aanvraag wordt verstuurd…";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
      signal: AbortSignal.timeout(15000),
    });
    const result = await response.json();
    if (!response.ok || result.success !== true) throw new Error("Submission failed");

    form.reset();
    status.textContent = "Bedankt! Je aanvraag is verstuurd. We reageren op het e-mailadres dat je hebt opgegeven.";
  } catch {
    status.textContent = "Versturen kon niet worden bevestigd. Probeer het opnieuw of gebruik de gegevens onder Contact.";
  } finally {
    button.disabled = false;
  }
});
