import "animate.css/animate.min.css";
import WOW from "wow.js";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook } from "@fortawesome/free-solid-svg-icons";
import "./Menu.css";

const courses = [
  { id: 1, name: "KN phòng tránh, xử lý tình huống ngạt nước, đuối nước", videoUrl: "/videos/ngatnuoc.mp4" },
  { id: 2, name: "KN phòng chống và xử lý khi xảy ra tai nạn giao thông", videoUrl: "/videos/tainan.mp4" },
  { id: 3, name: "KN phòng chống và xử lý khi có hỏa hoạn", videoUrl: "/videos/hoahoa.mp4" },
  { id: 4, name: "KN phòng chống bắt cóc, xâm hại", videoUrl: "/videos/batcoc.mp4" },
  { id: 5, name: "KN phòng chống bạo lực học đường", videoUrl: "/videos/baoluc.mp4" },
  { id: 6, name: "KN phòng chống và xử lý khi bị hóc, sặc dị vật đường thở", videoUrl: "/videos/hoc.mp4" },
  { id: 7, name: "KN sơ cấp cứu ban đầu theo tiêu chuẩn WHO", videoUrl: "/videos/socapcuu.mp4" },
  { id: 8, name: "An toàn không gian mạng", videoUrl: "/videos/antoankhongianmang.mp4" },
  { id: 9, name: "KN phòng chống và xử lý khi xảy ra tai nạn điện", videoUrl: "/videos/tainandien.mp4" },
  { id: 10, name: "KN phòng chống ma túy và các chất gây nghiện", videoUrl: "/videos/matuy.mp4" },
  { id: 11, name: "KN phòng chống ngộ độc thực phẩm", videoUrl: "/videos/ngodoc.mp4" },
  { id: 12, name: "KN phòng chống và xử lý khi bị động vật tấn công", videoUrl: "/videos/dongvat.mp4" }
];

const Menu = () => {
  useEffect(() => {
    new WOW().init();
  }, []);

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [videoExists, setVideoExists] = useState(true);

  useEffect(() => {
    fetch(selectedCourse.videoUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error("Video not found");
        }
        setVideoExists(true);
      })
      .catch(() => setVideoExists(false));
  }, [selectedCourse]);

  return (
    <>
      <section style={{ backgroundColor: "white", color: "gold" }}>
        <div className="container text-center">
          <h1>Danh sách khóa học</h1>
          <p className="breadcrumbs">
            <span>
              <a href="index.html">
                Trang chủ <FontAwesomeIcon icon={faHome} />
              </a>
            </span>
            <span>
              Khóa học <FontAwesomeIcon icon={faBook} />
            </span>
          </p>
        </div>
      </section>

      <section id="courses" className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <div className="course-list">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className={`course-item ${selectedCourse.id === course.id ? "active" : ""}`}
                    onClick={() => setSelectedCourse(course)}
                    style={{ backgroundColor: selectedCourse.id === course.id ? "orange" : "white", padding: "10px", borderRadius: "5px", cursor: "pointer" }}
                  >
                    {course.name}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="col-md-8">
              <div className="course-details text-center">
                <h3>{selectedCourse.name}</h3>
                {videoExists ? (
                  <video 
                    key={selectedCourse.id} 
                    width="80%" 
                    controls 
                    style={{ borderRadius: "15px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}
                  >
                    <source src={selectedCourse.videoUrl} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video.
                  </video>
                ) : (
                  <p style={{ fontSize: "18px", color: "red", fontWeight: "bold" }}>Video đang cập nhật...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
