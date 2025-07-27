export default function MainPage() {
    return (
        <div className="container">
            <h1>Giới thiệu hệ thống hỗ trợ kỹ thuật</h1>

            <div className="section">
                <p>Ứng dụng này được phát triển nhằm hỗ trợ đội ngũ DEV và CSE trong quá trình xử lý các task support hằng ngày. Hệ thống cung cấp <strong>2 tính năng chính</strong>:</p>
                <ul>
                    <li><strong>Hướng dẫn làm task support</strong>: cung cấp hướng dẫn chi tiết từ các DEV có kinh nghiệm.</li>
                    <li><strong>Tự động hoàn thành task support</strong>: thực hiện các thao tác đơn giản như thêm confirm password, đa ngôn ngữ, ....</li>
                </ul>
            </div>

            <h2>Cách sử dụng</h2>

            <div className="section">
                <h3>1. Giao diện chính</h3>
                <ul>
                    <li><strong>Introduction</strong>: thông tin về app</li>
                    <li><strong>Solution</strong>: danh sách các bài hướng dẫn</li>
                    <li><strong>Automatic</strong>: danh sách các tác vụ tự động hóa được hỗ trợ</li>
                    <li><strong>Timeline</strong>: lộ trình phát triển app, các tính năng dự kiến trong tương lai</li>
                </ul>
            </div>

            <div className="section">
                <h3>2. Tính năng hướng dẫn</h3>
                <ul>
                    <li>Tìm kiếm các hướng dẫn giải quyết một số vấn đề cụ thể</li>
                    <li>Các bài được phân loại qua tag, module</li>
                </ul>
            </div>

            <div className="section">
                <h3>3. Tính năng tự động xử lý</h3>
                <ul>
                    <li>Giao diện web đơn giản, thuận tiện cho tất cả mọi người</li>
                    <li>Tương tác với VAHU, có thể tự động thêm các đoạn code để giải quyết một số task</li>
                </ul>
            </div>
        </div>
    );
}
