import React from "react";
import Link from "next/link";
import { Row, Col } from "antd";

interface CmsFooterLinksProps {
  className?: string;
}

const CmsFooterLinks: React.FC<CmsFooterLinksProps> = ({ className }) => {
  const links = [
    {
      title: "Công ty",
      items: [
        { label: "Về chúng tôi", href: "/about-us" },
        { label: "Liên hệ", href: "/contact-us" },
      ],
    },
    {
      title: "Pháp lý",
      items: [
        { label: "Điều khoản dịch vụ", href: "/terms-of-service" },
        { label: "Chính sách bảo mật", href: "/privacy-policy" },
        { label: "Thông tin pháp lý", href: "/legal-info" },
      ],
    },
    {
      title: "Bảo mật",
      items: [
        { label: "Thông tin bảo mật", href: "/security-info" },
        { label: "Cài đặt Cookie", href: "/cookie-settings" },
      ],
    },
  ];

  return (
    <div className={className}>
      <Row gutter={[24, 16]}>
        {links.map((section, index) => (
          <Col key={index} xs={24} sm={8} md={6}>
            <h4 className="font-semibold text-gray-900 mb-3">
              {section.title}
            </h4>
            <ul className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Link
                    href={item.href}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CmsFooterLinks;
