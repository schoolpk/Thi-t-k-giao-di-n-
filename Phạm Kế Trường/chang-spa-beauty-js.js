
var savedProducts = localStorage.getItem("changSpaProducts");
var parsedProducts = null;

if (savedProducts) {
    try {
        parsedProducts = JSON.parse(savedProducts);
    } catch (error) {
        localStorage.removeItem("changSpaProducts");
    }
}

var products = parsedProducts || [];

var categoryIcons = {
    "Tất cả": "🛍️",
    "Dưỡng da mặt": "🧴",
    "Trang điểm": "💄",
    "Chăm sóc cơ thể": "🌿"
};

var sortOptions = [
    ["pop", "Phổ biến"],
    ["best", "Bán chạy"],
    ["asc", "Giá thấp ↑"],
    ["desc", "Giá cao ↓"]
];

var categories = ["Tất cả"].concat(
    products
        .map(function (product) {
            return product[7];
        })
        .filter(function (value, index, values) {
            return values.indexOf(value) === index;
        })
);

var currentCategory = "Tất cả";
var currentSort = "pop";
var searchInput = document.getElementById("q");
var grid = document.getElementById("grid");
var categoryBox = document.getElementById("cats");
var tabs = document.getElementById("tabs");

// Tạo một phần tử HTML với class và nội dung văn bản nếu được truyền vào.
function createElement(tagName, className, text) {
    var element = document.createElement(tagName);

    if (className) {
        element.className = className;
    }

    if (text !== undefined) {
        element.textContent = text;
    }

    return element;
}

// Định dạng giá sản phẩm theo tiền tệ Việt Nam kèm ký hiệu đồng.
function formatPrice(price) {
    return price.toLocaleString("vi-VN") + "đ";
}

// Rút gọn số lượng đã bán: ví dụ 1500 sẽ được hiển thị là 1,5k.
function formatSoldCount(count) {
    if (count >= 1000) {
        return (count / 1000).toFixed(1).replace(".", ",") + "k";
    }

    return String(count);
}

// Vẽ lại danh mục, tùy chọn sắp xếp và danh sách sản phẩm trên giao diện.
function render() {
    categoryBox.innerHTML = "";
    tabs.innerHTML = "";
    grid.innerHTML = "";

    categories.forEach(function (category) {
        var button = createElement(
            "button",
            category === currentCategory ? "on" : ""
        );

        button.appendChild(
            createElement(
                "span",
                "ic",
                categoryIcons[category] || "•"
            )
        );

        button.appendChild(document.createTextNode(category));

        button.onclick = function () {
            currentCategory = category;
            render();
        };

        categoryBox.appendChild(button);
    });

    sortOptions.forEach(function (option) {
        var button = createElement(
            "button",
            "tab" + (option[0] === currentSort ? " on" : ""),
            option[1]
        );

        button.onclick = function () {
            currentSort = option[0];
            render();
        };

        tabs.appendChild(button);
    });

    var searchText = searchInput.value.trim().toLowerCase();
    var filteredProducts = products.filter(function (product) {
        var matchesCategory =
            currentCategory === "Tất cả" ||
            product[7] === currentCategory;

        var matchesSearch =
            !searchText ||
            (product[1] + product[7]).toLowerCase().indexOf(searchText) >= 0;

        return matchesCategory && matchesSearch;
    });

    if (currentSort === "best") {
        filteredProducts.sort(function (a, b) {
            return b[3] - a[3];
        });
    }

    if (currentSort === "asc") {
        filteredProducts.sort(function (a, b) {
            return a[2] - b[2];
        });
    }

    if (currentSort === "desc") {
        filteredProducts.sort(function (a, b) {
            return b[2] - a[2];
        });
    }

    filteredProducts.forEach(function (product) {
        var card = createElement("div", "card");
        var inner = createElement("div", "in");
        var front = createElement("div", "face");
        var back = createElement("div", "face bk");
        var productIcon = createElement(
            "div",
            "pi c" + (products.indexOf(product) % 4),
        );

        if (product[8]) {
            var image = createElement("img", "product-image");
            image.src = product[8];
            image.alt = product[1];
            productIcon.appendChild(image);
        } else {
            productIcon.textContent = product[0] || "✨";
        }

        if (product[5]) {
            productIcon.appendChild(
                createElement(
                    "span",
                    "badge " + product[6],
                    product[5]
                )
            );
        }

        var productInfo = createElement("div", "pf");
        productInfo.appendChild(
            createElement("div", "pn", product[1])
        );
        productInfo.appendChild(
            createElement("div", "pr", formatPrice(product[2]))
        );

        front.appendChild(productIcon);
        front.appendChild(productInfo);

        back.appendChild(createElement("h3", "", product[1]));
        back.appendChild(createElement("span", "chip", product[7]));
        back.appendChild(
            createElement(
                "p",
                "",
                "⭐ " + product[4] + " · Đã bán " + formatSoldCount(product[3])
            )
        );
        back.appendChild(
            createElement("p", "", "Giá: " + formatPrice(product[2]))
        );

        if (product[5]) {
            var promotionText =
                product[5][0] === "-"
                    ? "Ưu đãi: giảm " + product[5].slice(1)
                    : "Nhãn: " + product[5];

            back.appendChild(createElement("p", "", promotionText));
        }

        back.appendChild(
            createElement(
                "p",
                "mu",
                "🚚 Giao toàn quốc · 🔄 Đổi trả 7 ngày"
            )
        );

        inner.appendChild(front);
        inner.appendChild(back);
        card.appendChild(inner);

        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute(
            "aria-label",
            product[1] + ": nhấn Enter để lật xem thông tin"
        );

        card.onclick = function () {
            if (!matchMedia("(hover:hover)").matches) {
                card.classList.toggle("flip");
            }
        };

        card.onkeydown = function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                card.classList.toggle("flip");
            } else if (event.key === "Escape") {
                card.classList.remove("flip");
            }
        };

        card.onmousemove = function (event) {
            if (
                matchMedia("(prefers-reduced-motion:reduce)").matches
            ) {
                return;
            }

            var rectangle = card.getBoundingClientRect();
            var horizontal =
                (event.clientX - rectangle.left) / rectangle.width - .5;
            var vertical =
                (event.clientY - rectangle.top) / rectangle.height - .5;

            card.style.transform =
                "rotateX(" + (-vertical * 12) + "deg) " +
                "rotateY(" + (horizontal * 12) + "deg)";
        };

        card.onmouseleave = function () {
            card.style.transform = "";
        };

        grid.appendChild(card);
    });

    if (filteredProducts.length === 0) {
        grid.appendChild(
            createElement(
                "p",
                "mu",
                "Không tìm thấy sản phẩm phù hợp."
            )
        );
    }
}

searchInput.oninput = render;
render();

// Đồng bộ dữ liệu sản phẩm từ localStorage, cập nhật danh mục và vẽ lại giao diện.
function syncProductsFromStorage(storageValue) {
    var latestProducts;

    try {
        latestProducts = JSON.parse(storageValue);
    } catch (error) {
        return;
    }

    products.splice(0, products.length);
    latestProducts.forEach(function (product) {
        products.push(product);
    });

    categories.splice(0, categories.length, "Tất cả");
    products.forEach(function (product) {
        if (categories.indexOf(product[7]) === -1) {
            categories.push(product[7]);
        }
    });

    render();
}

// Lắng nghe thay đổi localStorage từ cửa sổ hoặc tab khác.
window.addEventListener("storage", function (event) {
    if (event.key !== "changSpaProducts" || !event.newValue) {
        return;
    }
    syncProductsFromStorage(event.newValue);
});

// Kiểm tra lại dữ liệu sản phẩm khi người dùng quay lại cửa sổ hoặc tab hiện tại.
window.addEventListener("focus", function () {
    var latestProducts = localStorage.getItem("changSpaProducts");

    if (!latestProducts) {
        return;
    }
    syncProductsFromStorage(latestProducts);
});

var authOverlay = document.getElementById("auth-overlay");
var loginTab = document.getElementById("login-tab");
var registerTab = document.getElementById("register-tab");
var loginForm = document.getElementById("login-form");
var registerForm = document.getElementById("register-form");
var authClose = document.getElementById("auth-close");
var systemToast = document.getElementById("system-toast");
var toastTimer;

// Mở popup xác thực, hiển thị tab đăng nhập hoặc đăng ký và đưa con trỏ vào ô nhập đầu tiên.
function showAuthPanel(panelName) {
    var showLogin = panelName === "login";

    loginTab.classList.toggle("active", showLogin);
    registerTab.classList.toggle("active", !showLogin);
    loginTab.setAttribute("aria-selected", String(showLogin));
    registerTab.setAttribute("aria-selected", String(!showLogin));
    loginForm.classList.toggle("active", showLogin);
    registerForm.classList.toggle("active", !showLogin);

    authOverlay.classList.add("open");
    authOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    window.setTimeout(function () {
        var activeForm = showLogin ? loginForm : registerForm;
        var firstInput = activeForm.querySelector("input");

        if (firstInput) {
            firstInput.focus();
        }
    }, 100);
}

// Đóng popup xác thực và khôi phục khả năng cuộn trang.
function closeAuthPanel() {
    authOverlay.classList.remove("open");
    authOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

// Hiển thị thông báo hệ thống tạm thời trong vài giây.
function showSystemToast(message) {
    systemToast.textContent = message;
    systemToast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
        systemToast.classList.remove("show");
    }, 2600);
}

// Mở popup đăng nhập khi nút đăng nhập được nhấn.
document.getElementById("open-login").addEventListener("click", function () {
    showAuthPanel("login");
});


// Mở popup đăng ký khi nút đăng ký được nhấn.
document.getElementById("open-register").addEventListener("click", function () {
    showAuthPanel("register");
});

// Chuyển popup sang chế độ đăng nhập.
loginTab.addEventListener("click", function () {
    showAuthPanel("login");
});

// Chuyển popup sang chế độ đăng ký.
registerTab.addEventListener("click", function () {
    showAuthPanel("register");
});

// Chuyển từ popup đăng nhập sang tab đăng ký.
document.getElementById("switch-register").addEventListener("click", function () {
    showAuthPanel("register");
});

// Chuyển từ popup đăng ký sang tab đăng nhập.
document.getElementById("switch-login").addEventListener("click", function () {
    showAuthPanel("login");
});

// Đóng popup khi nhấn nút đóng.
authClose.addEventListener("click", closeAuthPanel);

// Đóng popup khi người dùng nhấn ra vùng nền bên ngoài.
authOverlay.addEventListener("click", function (event) {
    if (event.target === authOverlay) {
        closeAuthPanel();
    }
});

// Đóng popup bằng phím Escape khi popup đang mở.
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && authOverlay.classList.contains("open")) {
        closeAuthPanel();
    }
});

// Xử lý đăng nhập: kiểm tra tài khoản quản trị và chuyển sang trang dashboard.
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("login-email");
    var password = document.getElementById("login-password");

    var isAdminEmail = email.value.trim().toLowerCase() === "admin@gmail.com";

    if (!isAdminEmail) {
        closeAuthPanel();
        showSystemToast("Đăng nhập thành công! Chào mừng bạn trở lại ✨");
        return;
    }

    if (password.value !== "123456") {
        showSystemToast("Email hoặc mật khẩu quản trị không đúng.");
        password.select();
        return;
    }

    sessionStorage.setItem("changSpaAdminAuthenticated", "true");
    closeAuthPanel();
    window.location.href = "dashboard.html";
});

// Xử lý đăng ký: kiểm tra xác nhận mật khẩu trước khi hoàn tất.
registerForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var password = document.getElementById("register-password");
    var confirmPassword = document.getElementById("register-confirm");

    if (password.value !== confirmPassword.value) {
        confirmPassword.setCustomValidity("Mật khẩu xác nhận không khớp.");
        confirmPassword.reportValidity();
        return;
    }

    confirmPassword.setCustomValidity("");
    closeAuthPanel();
    showSystemToast("Đăng ký thành công! Tài khoản của bạn đã được tạo 🌸");
});

// Xóa thông báo sai mật khẩu xác nhận khi người dùng sửa ô nhập.
document.getElementById("register-confirm").addEventListener("input", function (event) {
    event.target.setCustomValidity("");
});
