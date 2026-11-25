// ===== Cài đặt: khớp với chang-spa-beauty.js của trang chủ =====
var STORAGE_KEY = "changSpaProducts";
var SESSION_KEY = "changSpaAdminAuthenticated";

// Mỗi sản phẩm là 1 mảng, thứ tự phải giữ nguyên như trang chủ:
// [0] emoji, [1] tên, [2] giá, [3] đã bán, [4] đánh giá,
// [5] nhãn, [6] màu nhãn ("", "new", "hot"), [7] danh mục, [8] link ảnh
var DEFAULT_CATEGORIES = ["Dưỡng da mặt", "Trang điểm", "Chăm sóc cơ thể"];

var products = loadProducts();
var editingIndex = -1; // -1 = đang thêm mới, số khác = vị trí sản phẩm đang sửa
var toastTimer;
var currentImage = ""; // ảnh đang chọn trong hộp thoại (chuỗi data URL hoặc link cũ)

function $(id) { return document.getElementById(id); }

// ===== Đọc / lưu dữ liệu =====
function loadProducts() {
    try {
        var data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (Array.isArray(data)) {
            var migrated = false;
            data = data.map(function (product) {
                // Sản phẩm lưu từ bản không có emoji (8 phần tử) -> thêm "" ở đầu để khớp trang chủ (9 phần tử)
                if (Array.isArray(product) && product.length === 8) {
                    migrated = true;
                    return [""].concat(product);
                }
                return product;
            });
            if (migrated) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            }
            return data;
        }
    } catch (error) {
        // dữ liệu hỏng thì bắt đầu lại từ danh sách rỗng
    }
    return [];
}

function saveProducts() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
        return true;
    } catch (error) {
        showToast("Không lưu được dữ liệu vào trình duyệt.");
        return false;
    }
}

// ===== Tiện ích =====
function make(tagName, text, className) {
    var element = document.createElement(tagName);
    if (className) { element.className = className; }
    if (text !== undefined) { element.textContent = text; }
    return element;
}

function num(value) {
    return Number(value) || 0;
}

function formatPrice(price) {
    return num(price).toLocaleString("vi-VN") + "đ";
}

function showToast(message) {
    var toast = $("toast");
    toast.textContent = message;
    toast.classList.add("show");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
        toast.classList.remove("show");
    }, 2400);
}

// ===== Kiểm tra đăng nhập admin =====
// Đăng nhập thực hiện ở trang chủ (nút "Đăng nhập"), trang này chỉ kiểm tra cờ đã lưu.
function isAdmin() {
    try {
        return sessionStorage.getItem(SESSION_KEY) === "true";
    } catch (error) {
        return false;
    }
}

$("logout-btn").addEventListener("click", function () {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (error) { }
    window.location.href = "index.html";
});

// ===== Hiển thị =====
function makeThumb(product, index) {
    var box = make("div", "", "adm-thumb c" + (index % 4));
    var emoji = product[0] || "✨";

    if (product[8]) {
        var image = document.createElement("img");
        image.src = product[8];
        image.alt = product[1];
        image.onerror = function () { // link ảnh hỏng thì quay về emoji
            image.remove();
            box.textContent = emoji;
        };
        box.appendChild(image);
    } else {
        box.textContent = emoji;
    }
    return box;
}

function refreshCategories() {
    var used = [];
    products.forEach(function (product) {
        if (used.indexOf(product[7]) === -1) { used.push(product[7]); }
    });
    used.sort();

    // Danh sách lọc: chỉ các danh mục đang có sản phẩm
    var current = $("cat-filter").value;
    $("cat-filter").innerHTML = "";
    $("cat-filter").appendChild(new Option("Tất cả danh mục", ""));
    used.forEach(function (category) {
        $("cat-filter").appendChild(new Option(category, category));
    });
    $("cat-filter").value = used.indexOf(current) >= 0 ? current : "";

    // Gợi ý khi nhập danh mục: 3 danh mục có sẵn + danh mục đã dùng
    var suggestions = DEFAULT_CATEGORIES.slice();
    used.forEach(function (category) {
        if (suggestions.indexOf(category) === -1) { suggestions.push(category); }
    });
    $("cat-list").innerHTML = "";
    suggestions.forEach(function (category) {
        $("cat-list").appendChild(new Option(category));
    });

    return used.length;
}

function render() {
    var categoryCount = refreshCategories();

    // Thống kê
    var totalSold = 0;
    var totalRating = 0;
    products.forEach(function (product) {
        totalSold += num(product[3]);
        totalRating += num(product[4]);
    });
    $("stat-total").textContent = products.length;
    $("stat-cats").textContent = categoryCount;
    $("stat-sold").textContent = totalSold.toLocaleString("vi-VN");
    $("stat-rating").textContent = products.length ? (totalRating / products.length).toFixed(1) : "0";

    // Lọc theo ô tìm kiếm và danh mục (giữ lại vị trí gốc để sửa/xóa đúng sản phẩm)
    var keyword = $("search").value.trim().toLowerCase();
    var category = $("cat-filter").value;
    var rows = [];
    products.forEach(function (product, index) {
        var matchName = String(product[1]).toLowerCase().indexOf(keyword) >= 0;
        var matchCategory = !category || product[7] === category;
        if (matchName && matchCategory) {
            rows.push({ product: product, index: index });
        }
    });

    // Trạng thái rỗng
    $("empty").hidden = rows.length > 0;
    $("empty-text").textContent = products.length === 0
        ? "Chưa có sản phẩm nào. Bấm “Thêm sản phẩm” để tạo mới."
        : "Không tìm thấy sản phẩm phù hợp.";

    // Vẽ bảng
    $("tbody").innerHTML = "";
    rows.forEach(function (row) {
        var product = row.product;
        var index = row.index;
        var tr = document.createElement("tr");

        var tdThumb = make("td");
        tdThumb.appendChild(makeThumb(product, index));

        var tdBadge = make("td");
        if (product[5]) {
            tdBadge.appendChild(make("span", product[5], "adm-badge " + product[6]));
        }

        var editButton = make("button", "Sửa", "adm-btn light small");
        var deleteButton = make("button", "Xóa", "adm-btn danger small");
        editButton.type = "button";
        deleteButton.type = "button";
        editButton.setAttribute("aria-label", "Sửa " + product[1]);
        deleteButton.setAttribute("aria-label", "Xóa " + product[1]);
        editButton.onclick = function () { openDialog(index); };
        deleteButton.onclick = function () { deleteProduct(index); };

        var tdActions = make("td", undefined, "adm-actions");
        tdActions.appendChild(editButton);
        tdActions.appendChild(document.createTextNode(" "));
        tdActions.appendChild(deleteButton);

        tr.appendChild(tdThumb);
        tr.appendChild(make("td", product[1]));
        tr.appendChild(make("td", product[7]));
        tr.appendChild(make("td", formatPrice(product[2]), "adm-price"));
        tr.appendChild(make("td", num(product[3]).toLocaleString("vi-VN")));
        tr.appendChild(make("td", "⭐ " + num(product[4])));
        tr.appendChild(tdBadge);
        tr.appendChild(tdActions);
        $("tbody").appendChild(tr);
    });
}

$("search").addEventListener("input", render);
$("cat-filter").addEventListener("change", render);

// ===== Ảnh từ thiết bị =====
var MAX_IMAGE_SIDE = 700; // thu nhỏ ảnh để tiết kiệm bộ nhớ trình duyệt

function showPreview() {
    var box = $("image-preview");
    box.innerHTML = "";
    if (!currentImage) {
        box.textContent = "Chưa có ảnh";
        return;
    }
    var img = document.createElement("img");
    img.alt = "Xem trước ảnh sản phẩm";
    img.onerror = function () { box.textContent = "Không tải được ảnh"; };
    img.src = currentImage;
    box.appendChild(img);
}

// Đọc file ảnh, thu nhỏ bằng canvas rồi trả về chuỗi data URL (JPEG)
function resizeImage(file, done, fail) {
    var url = URL.createObjectURL(file);
    var img = new Image();

    img.onload = function () {
        var scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
        var canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
        canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));

        var context = canvas.getContext("2d");
        context.fillStyle = "#fff"; // nền trắng cho ảnh PNG trong suốt
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        URL.revokeObjectURL(url);
        done(canvas.toDataURL("image/jpeg", 0.8));
    };

    img.onerror = function () {
        URL.revokeObjectURL(url);
        fail();
    };

    img.src = url;
}

$("f-image-file").addEventListener("change", function () {
    var file = this.files[0];
    if (!file) { return; }

    if (file.type.indexOf("image/") !== 0) {
        $("form-error").textContent = "Vui lòng chọn một file ảnh (JPG, PNG, WebP…).";
        this.value = "";
        return;
    }

    resizeImage(file, function (dataUrl) {
        currentImage = dataUrl;
        $("form-error").textContent = "";
        showPreview();
    }, function () {
        $("form-error").textContent = "Không đọc được file ảnh này. Hãy thử file khác.";
    });
});

$("remove-image").addEventListener("click", function () {
    currentImage = "";
    $("f-image-file").value = "";
    showPreview();
});

// ===== Thêm / sửa / xóa =====
function openDialog(index) {
    editingIndex = index;
    var product = index >= 0 ? products[index] : ["", "", "", 0, 5, "", "", "", ""];

    $("dialog-title").textContent = index >= 0 ? "Sửa sản phẩm" : "Thêm sản phẩm";
    $("f-name").value = product[1];
    $("f-price").value = product[2];
    $("f-sold").value = product[3];
    $("f-rating").value = product[4];
    $("f-badge").value = product[5];
    $("f-badgeclass").value = product[6];
    if ($("f-badgeclass").selectedIndex === -1) { $("f-badgeclass").value = ""; }
    $("f-category").value = product[7];
    currentImage = product[8] || "";
    $("f-image-file").value = "";
    showPreview();
    $("form-error").textContent = "";

    $("product-dialog").showModal();
    $("f-name").focus();
}

$("add-btn").addEventListener("click", function () { openDialog(-1); });
$("cancel-btn").addEventListener("click", function () { $("product-dialog").close(); });

function showFormError(message, fieldId) {
    $("form-error").textContent = message;
    $(fieldId).focus();
}

$("product-form").addEventListener("submit", function (event) {
    event.preventDefault();

    var name = $("f-name").value.trim();
    var category = $("f-category").value.trim();
    var price = Number($("f-price").value);
    var sold = Number($("f-sold").value);
    var rating = Number($("f-rating").value);
    var badge = $("f-badge").value.trim();
    var image = currentImage;

    if (!name) {
        showFormError("Vui lòng nhập tên sản phẩm.", "f-name");
        return;
    }
    if (!category) {
        showFormError("Vui lòng nhập danh mục.", "f-category");
        return;
    }
    if ($("f-price").value.trim() === "" || !(price >= 0) || price % 1 !== 0) {
        showFormError("Giá phải là số nguyên từ 0 trở lên (ví dụ 189000).", "f-price");
        return;
    }
    if (!(sold >= 0) || sold % 1 !== 0) {
        showFormError("Số lượng đã bán phải là số nguyên từ 0 trở lên.", "f-sold");
        return;
    }
    if (!(rating >= 0 && rating <= 5)) {
        showFormError("Đánh giá phải nằm trong khoảng 0 đến 5.", "f-rating");
        return;
    }
    $("form-error").textContent = "";

    // Vị trí [0] (emoji) không còn nhập trong form nhưng phải giữ chỗ để khớp với trang chủ
    var icon = editingIndex >= 0 ? products[editingIndex][0] : "";
    var product = [icon, name, price, sold, rating, badge, badge ? $("f-badgeclass").value : "", category, image];

    var backup = products.slice();
    if (editingIndex >= 0) {
        products[editingIndex] = product;
    } else {
        products.push(product);
    }

    if (!saveProducts()) { // bộ nhớ đầy -> hoàn tác và giữ hộp thoại mở
        products = backup;
        $("form-error").textContent = "Bộ nhớ trình duyệt đã đầy. Hãy chọn ảnh nhỏ hơn hoặc xóa ảnh của sản phẩm khác.";
        return;
    }

    showToast(editingIndex >= 0 ? "Đã cập nhật sản phẩm." : "Đã thêm sản phẩm.");
    $("product-dialog").close();
    render();
});

function deleteProduct(index) {
    if (!confirm("Xóa sản phẩm “" + products[index][1] + "”? Thao tác này không hoàn tác được.")) {
        return;
    }
    products.splice(index, 1);
    saveProducts();
    render();
    showToast("Đã xóa sản phẩm.");
}

// ===== Chạy khi mở trang =====
if (isAdmin()) {
    $("app").hidden = false;
    render();
} else {
    window.location.replace("index.html");
}