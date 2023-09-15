

// Open the full screen search box
function openSearch() {
    $("#myOverlay").css("display", "block");
    // focus on search box
    $("#search-input").focus();
    // clear search box
    $("#search-input").val("");
}

// Close the full screen search box
function closeSearch() {
    $("#myOverlay").css("display", "none");
}

function clickOnOverlay(e) {
    if ($(e.target).closest("#search-input").length === 0) {
        closeSearch();
    }
}