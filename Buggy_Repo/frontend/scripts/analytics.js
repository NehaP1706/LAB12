const baseURL = "http://localhost:8001";

async function loadAnalytics() {
  try {
    const res = await fetch(`${baseURL}/analytics`);
    const data = await res.json();

    if (!data.stats) {
      console.error("Missing 'stats' in response:", data);
      return;
    }

    document.getElementById("itemCount").textContent = data.stats.item_count ?? "N/A";
    document.getElementById("userCount").textContent = data.stats.user_count ?? "N/A";
    document.getElementById("avgItemName").textContent =
      data.stats.avg_item_name_length != null ? data.stats.avg_item_name_length.toFixed(2) : "N/A";
    document.getElementById("avgUserName").textContent =
      data.stats.avg_user_username_length != null ? data.stats.avg_user_username_length.toFixed(2) : "N/A";
    document.getElementById("maxItemName").textContent = data.stats.max_item_name_length ?? "N/A";
    document.getElementById("maxUserName").textContent = data.stats.max_user_username_length ?? "N/A";

    document.getElementById("plot").src = data.plot ?? "";
  } catch (error) {
    console.error("Failed to load analytics:", error);
  }
}

loadAnalytics();

