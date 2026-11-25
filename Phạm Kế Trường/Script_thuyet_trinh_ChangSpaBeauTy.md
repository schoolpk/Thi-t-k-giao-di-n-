# SCRIPT THUYẾT TRÌNH SẢN PHẨM HTML -- CHANGSPABEAUTY

**Chủ đề:** Cách xây dựng trang web bán mỹ phẩm ChangSpaBeauTy\
**Học phần:** Thiết kế giao diện người dùng\
**Gợi ý:** Có thể đọc lời dẫn theo từng slide và kết hợp thao tác trực
tiếp trên website khi trình bày.

------------------------------------------------------------------------

## Slide 1 -- Giới thiệu

Xin chào thầy cô và các bạn. Hôm nay em xin trình bày sản phẩm website
bán mỹ phẩm có tên là **ChangSpaBeauTy**. Đây là sản phẩm được xây dựng
trong học phần Thiết kế giao diện người dùng, sử dụng HTML, CSS và
JavaScript.

Website hướng đến hai nhóm người dùng: khách hàng và người quản trị.
Khách hàng có thể xem, tìm kiếm và lọc sản phẩm; người quản trị có thể
quản lý danh sách sản phẩm. Trong phần trình bày này, em sẽ giới thiệu
chức năng chính, cách xây dựng và những điểm nổi bật của sản phẩm.

## Slide 2 -- Nội dung trình bày

Bài thuyết trình gồm sáu nội dung. Đầu tiên là bài toán và chức năng của
website. Tiếp theo, em giới thiệu các công cụ và quy trình thực hiện.
Sau đó là phần xây dựng giao diện trang chủ, xử lý dữ liệu bằng
JavaScript, xây dựng trang quản trị và cuối cùng là đánh giá sản phẩm
cũng như hướng phát triển.

## Slide 3 -- Bài toán và chức năng

Website được xây dựng để hỗ trợ hoạt động giới thiệu và quản lý sản phẩm
mỹ phẩm.

Ở phía khách hàng, website cho phép xem danh sách sản phẩm dưới dạng
thẻ, tìm kiếm theo tên, lọc theo danh mục và sắp xếp sản phẩm. Người
dùng còn có thể lật thẻ để xem thêm thông tin như giá, đánh giá, số
lượng đã bán và ưu đãi.

Ở phía người bán, trang quản trị hỗ trợ xem danh sách sản phẩm, thêm sản
phẩm mới, chỉnh sửa, xóa và chọn ảnh trực tiếp từ máy tính.

Hai trang sử dụng chung một nguồn dữ liệu lưu trong trình duyệt. Vì vậy,
khi người quản trị cập nhật sản phẩm, trang chủ có thể nhận thay đổi mà
không cần tải lại trang.

## Slide 4 -- Các công cụ xây dựng website

Sản phẩm sử dụng bốn thành phần chính.

-   **HTML** tạo cấu trúc và chia nội dung thành các khu vực.
-   **CSS** thiết kế màu sắc, bố cục, phông chữ và hiệu ứng.
-   **JavaScript** xử lý thao tác của người dùng, tìm kiếm, lọc và cập
    nhật giao diện.
-   **localStorage** lưu danh sách sản phẩm ngay trong trình duyệt.

Có thể hình dung HTML là bộ khung của ngôi nhà, CSS là phần trang trí,
JavaScript giúp các thành phần hoạt động, còn localStorage là nơi lưu
trữ dữ liệu.

## Slide 5 -- Quy trình thực hiện

Quá trình xây dựng được chia thành mười hai bước. Nhóm đầu tiên tập
trung vào cấu trúc tệp và giao diện. Nhóm tiếp theo chuẩn bị dữ liệu,
xây dựng chức năng trang chủ và đăng nhập. Sau đó là xây dựng trang quản
trị, thêm các thao tác quản lý và kết nối dữ liệu giữa hai trang. Bước
cuối cùng là kiểm tra và hoàn thiện giao diện.

Việc chia nhỏ quy trình giúp quá trình thực hiện rõ ràng hơn, đồng thời
dễ kiểm tra và sửa lỗi ở từng phần.

## Slide 6 -- Chuẩn bị cấu trúc tệp

Trước tiên, em tổ chức mã nguồn thành các tệp riêng biệt để dễ quản lý.

Trang chủ sử dụng `index.html`, tệp JavaScript `chang-spa-beauty-js.js`
và tệp CSS dùng chung `chang-spa-beauty-css.css`.

Trang quản trị sử dụng `dashboard.html`, `dashboard.js` và
`dashboard.css`. Tệp CSS dùng chung giúp hai trang giữ được phong cách
thiết kế nhất quán, còn CSS riêng dành cho các thành phần đặc thù của
trang quản trị.

Trong HTML, thẻ `link` được dùng để liên kết tệp CSS. Tệp JavaScript
được nạp ở cuối phần thân trang để các phần tử HTML cần thao tác đã được
tạo.

## Slide 7 -- Màu sắc và phông chữ

Tiếp theo là lựa chọn phong cách thiết kế. Website sử dụng tông hồng làm
màu chủ đạo, kết hợp với hồng nhạt, tím nhạt, xanh bạc hà và cam đào.
Màu chữ được chọn để tạo độ tương phản và giúp nội dung dễ đọc.

Các màu được khai báo thành biến CSS trong `:root`. Nhờ vậy, khi cần
thay đổi giao diện, em chỉ cần điều chỉnh giá trị biến thay vì sửa từng
thành phần.

Website sử dụng phông chữ Nunito, đồng thời có các phông dự phòng như DM
Sans và Arial. Ngoài giao diện sáng, website còn hỗ trợ chế độ tối bằng
cách thay đổi các biến màu.

## Slide 8 -- Dựng khung HTML trang chủ

Ở bước này, em sử dụng HTML để chia trang chủ thành những khu vực rõ
ràng.

-   `header` chứa tên thương hiệu.
-   `nav` chứa các liên kết, nút tài khoản và ô tìm kiếm.
-   `aside` bên trái là khu vực danh mục sản phẩm.
-   `main` là khu vực hiển thị sản phẩm, gồm các nút sắp xếp và lưới sản
    phẩm.
-   `aside` bên phải hiển thị các nội dung cam kết.
-   `footer` là phần cuối trang, chứa thông tin liên hệ.

Các khu vực cần được JavaScript hoặc CSS truy cập đều được gắn `id` hoặc
`class`. Ví dụ, phần tử có `id="grid"` là nơi JavaScript đưa các thẻ sản
phẩm vào.

## Slide 9 -- CSS tạo nên giao diện

Sau khi có cấu trúc HTML, em sử dụng CSS để định dạng giao diện.

Thứ nhất, biến CSS giúp quản lý màu sắc thống nhất. Thứ hai, Flexbox
được dùng để chia bố cục thành ba cột: hai cột bên có chiều rộng cố
định, còn cột giữa chiếm phần diện tích còn lại. Thứ ba, CSS Grid được
dùng để sắp xếp các thẻ sản phẩm thành lưới và tự điều chỉnh số cột theo
chiều rộng màn hình.

Website cũng có quy tắc responsive. Khi màn hình nhỏ hơn 768 pixel, bố
cục ba cột chuyển thành một cột để nội dung dễ xem hơn trên thiết bị di
động.

## Slide 10 -- Thẻ sản phẩm lật ba chiều

Một điểm nổi bật của trang chủ là hiệu ứng thẻ sản phẩm lật ba chiều.

Mặt trước hiển thị ảnh, tên sản phẩm, giá và nhãn khuyến mãi. Khi người
dùng tương tác, thẻ lật sang mặt sau để xem thêm danh mục, đánh giá, số
lượng đã bán và chính sách giao hàng.

Hiệu ứng này được tạo bằng CSS với các thuộc tính như `perspective`,
`transform-style: preserve-3d`, `backface-visibility` và phép xoay quanh
trục dọc.

Người dùng có thể tương tác bằng chuột, thao tác chạm hoặc bàn phím.
Điều này giúp việc xem thông tin sản phẩm trực quan và thuận tiện hơn.

## Slide 11 -- Dữ liệu sản phẩm

Để hai trang có thể sử dụng chung dữ liệu, em thống nhất cấu trúc thông
tin của mỗi sản phẩm. Mỗi sản phẩm được lưu dưới dạng một mảng gồm các
trường theo thứ tự: vị trí dự phòng, tên, giá, số lượng đã bán, đánh
giá, nhãn, màu nhãn, danh mục và ảnh.

Danh sách sản phẩm được lưu trong `localStorage` với khóa
`changSpaProducts`. Khi cần hiển thị hoặc chỉnh sửa, hai trang cùng đọc
dữ liệu theo cấu trúc đã thống nhất.

Điều quan trọng là không tự ý thay đổi thứ tự các trường, vì mã
JavaScript đang dựa vào vị trí của từng phần tử để lấy đúng thông tin.

## Slide 12 -- JavaScript vẽ trang chủ

JavaScript đảm nhiệm việc đưa dữ liệu thành nội dung hiển thị trên trang
chủ.

Hàm trung tâm là `render`. Hàm này đọc danh sách sản phẩm, lọc theo từ
khóa và danh mục, sắp xếp theo lựa chọn của người dùng, tạo các thẻ sản
phẩm rồi đưa chúng vào lưới hiển thị.

Khi người dùng nhập nội dung tìm kiếm, chọn danh mục hoặc thay đổi cách
sắp xếp, các sự kiện tương ứng sẽ gọi lại hàm `render`. Nhờ đó, danh
sách sản phẩm được cập nhật theo lựa chọn mà không cần tải lại toàn bộ
trang.

Các thẻ sản phẩm cũng được gắn sự kiện để hỗ trợ lật thẻ bằng chuột và
bàn phím.

## Slide 13 -- Đăng nhập và đăng ký

Website có hộp thoại đăng nhập và đăng ký được mở từ các nút trên thanh
điều hướng.

Biểu mẫu đăng ký kiểm tra độ dài mật khẩu và đối chiếu mật khẩu xác
nhận. Nếu thông tin không hợp lệ, hệ thống hiển thị thông báo để người
dùng sửa lại.

Trong sản phẩm hiện tại, chức năng đăng nhập chỉ mang tính mô phỏng. Tài
khoản quản trị mẫu được dùng để chuyển sang trang quản trị; trạng thái
đăng nhập được đánh dấu bằng `sessionStorage`.

Em cũng sử dụng `z-index` để sắp xếp thứ tự hiển thị giữa lớp phủ đăng
nhập và thông báo. Cần lưu ý rằng cách đăng nhập này phù hợp cho mục
đích minh họa, chưa đủ an toàn để sử dụng cho một website thương mại
thực tế.

## Slide 14 -- Dựng trang quản trị

Trang quản trị được thiết kế để người bán quản lý sản phẩm thuận tiện
hơn.

Giao diện gồm thanh bên và khu vực nội dung chính. Phần nội dung có nút
thêm sản phẩm, các ô thống kê, ô tìm kiếm, bộ lọc danh mục và bảng danh
sách sản phẩm.

Mỗi dòng trong bảng thể hiện thông tin của một sản phẩm và các thao tác
quản lý tương ứng. JavaScript tạo các dòng này dựa trên dữ liệu đang
lưu.

Trang quản trị được ẩn cho đến khi trạng thái đăng nhập quản trị được
xác nhận. Nếu chưa có quyền truy cập, người dùng sẽ được chuyển về trang
chủ.

## Slide 15 -- Thêm, sửa, xóa và chọn ảnh

Đây là nhóm chức năng quan trọng của trang quản trị.

Khi thêm sản phẩm, biểu mẫu được để trống để người quản trị nhập thông
tin mới. Khi sửa, biểu mẫu tự điền thông tin hiện tại để người dùng
chỉnh sửa. Khi xóa, hệ thống hỏi xác nhận trước khi thực hiện.

Dữ liệu được kiểm tra trước khi lưu. Ví dụ, giá và số lượng đã bán phải
là số nguyên không âm; điểm đánh giá nằm trong khoảng từ 0 đến 5.

Đối với ảnh, người quản trị có thể chọn tệp trực tiếp từ máy tính. Ảnh
được thu nhỏ, nén thành JPEG rồi chuyển thành chuỗi để lưu cùng dữ liệu.
Cách làm này giúp thao tác chọn ảnh đơn giản hơn, tuy nhiên dữ liệu ảnh
cũng chiếm dung lượng lưu trữ của trình duyệt.

## Slide 16 -- Cập nhật giữa hai trang

Một điểm đáng chú ý là dữ liệu có thể đồng bộ giữa trang chủ và trang
quản trị đang mở trong các thẻ trình duyệt khác nhau.

Khi người quản trị bấm lưu, trang quản trị ghi danh sách mới vào
`localStorage`. Trình duyệt phát sinh sự kiện `storage` ở các trang khác
cùng nguồn gốc. Trang chủ lắng nghe sự kiện này, đọc lại dữ liệu và gọi
hàm `render` để cập nhật danh sách.

Nhờ vậy, người đang xem trang chủ có thể thấy thay đổi mà không cần tự
tải lại trang. Đây là cơ chế cập nhật giữa các trang trong cùng trình
duyệt, không phải hệ thống đồng bộ trực tuyến qua máy chủ.

## Slide 17 -- Hoàn thiện giao diện

Ở bước cuối, em tập trung cải thiện khả năng sử dụng trên nhiều thiết bị
và với nhiều cách tương tác.

Website hỗ trợ chế độ tối dựa trên cài đặt giao diện của hệ thống. Người
dùng có thể sử dụng bàn phím để chọn thẻ và lật thẻ; các thành phần cũng
được bổ sung nhãn mô tả để hỗ trợ trình đọc màn hình.

Ngoài ra, website tôn trọng tùy chọn giảm chuyển động của người dùng
bằng cách hạn chế hiệu ứng lật và nghiêng. Với màn hình hẹp, bố cục được
chuyển thành một cột và bảng quản trị có thể cuộn ngang.

## Slide 18 -- Đánh giá và hướng phát triển

Về ưu điểm, website có giao diện nhất quán, hiệu ứng thẻ sản phẩm trực
quan, hỗ trợ tìm kiếm và lọc, đồng thời có các chức năng quản lý sản
phẩm cơ bản. Hai trang sử dụng chung dữ liệu nên việc cập nhật thuận
tiện. Mã nguồn HTML, CSS và JavaScript được tách thành các tệp riêng,
giúp dễ theo dõi và chỉnh sửa.

Tuy nhiên, sản phẩm vẫn có một số hạn chế. Dữ liệu chỉ lưu trong trình
duyệt nên dung lượng có giới hạn và chưa được chia sẻ giữa nhiều thiết
bị. Đăng nhập hiện tại chỉ là mô phỏng, chưa có cơ chế bảo mật thực tế.
Website cũng chưa có giỏ hàng và chức năng thanh toán.

Trong tương lai, em định hướng bổ sung máy chủ và cơ sở dữ liệu, xây
dựng đăng nhập và phân quyền an toàn, thêm giỏ hàng, thanh toán, quản lý
tồn kho, trang chi tiết sản phẩm và chức năng đánh giá của khách hàng.

## Slide 19 -- Kết thúc

Trên đây là phần trình bày về sản phẩm website bán mỹ phẩm
ChangSpaBeauTy, từ cấu trúc HTML, thiết kế CSS, xử lý JavaScript cho đến
quản lý dữ liệu và hoàn thiện giao diện.

Em xin cảm ơn thầy cô và các bạn đã lắng nghe. Em rất mong nhận được
những góp ý và xin sẵn sàng trả lời các câu hỏi về sản phẩm.

------------------------------------------------------------------------

## Gợi ý khi thuyết trình trực tiếp

1.  Khi giới thiệu trang chủ, hãy mở website và chỉ lần lượt khu vực tìm
    kiếm, danh mục, sắp xếp và thẻ sản phẩm.
2.  Thử lật một thẻ sản phẩm để minh họa mặt trước và mặt sau.
3.  Chuyển sang trang quản trị, minh họa thao tác thêm hoặc sửa một sản
    phẩm mẫu.
4.  Nếu có thể, mở trang chủ ở một thẻ trình duyệt khác rồi lưu thay đổi
    từ trang quản trị để minh họa cơ chế cập nhật.
5.  Khi nói về hạn chế, nhấn mạnh đây là sản phẩm học tập chạy bằng dữ
    liệu lưu trong trình duyệt, chưa phải hệ thống bán hàng triển khai
    thực tế.
