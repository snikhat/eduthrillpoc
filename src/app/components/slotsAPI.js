const BASE_URL = 'http://localhost:3000';

export function fetchSlots(slot = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: slot }), 500)
  );
}
export function fetchPanelList() {
  return fetch(`${BASE_URL}/api/panellist`).then(
    (data) => data.json()
  )
}

export function fetchCandidateList() {
  return fetch(`${BASE_URL}/api/candidatelist`).then(
    (data) => data.json()
  )
}

export function getPanelSlotsByDate(dateObj = null) {
  return fetch(`${BASE_URL}/api/getPanelSlotsByDate/${dateObj}`).then(
    (data) => data.json()
  )
}

export function getCandidateSlotsByDate(dateObj = null) {
  return fetch(`${BASE_URL}/api/getCandidateSlotsByDate/${dateObj}`).then(
    (data) => data.json()
  )
}
