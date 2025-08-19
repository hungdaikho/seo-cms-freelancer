# Project Sharing Feature Implementation

## Tổng quan

Tính năng chia sẻ project đã được thêm vào dashboard, cho phép người dùng:

- Chia sẻ project của mình với người khác
- Tìm kiếm và apply vào các project được chia sẻ
- Quản lý thành viên trong project
- Truy cập và làm việc với cả project của mình và project đã apply

## Cài đặt và Cấu hình

### 1. Dependencies

Tính năng này sử dụng các thư viện có sẵn trong project:

- Ant Design (antd) cho UI components
- Redux Toolkit cho state management
- React hooks cho component logic

### 2. API Endpoints được thêm

Các API endpoints mới đã được thêm vào `project.service.ts`:

```typescript
// Search shared projects
GET / projects / shared / search;
POST / projects / shared / apply;

// Applied projects management
GET / projects / applied;
DELETE / projects / applied / { projectId };

// Project sharing management
PATCH / projects / { id } / sharing;
GET / projects / { id } / members;
DELETE / projects / { id } / members / { memberId };
```

## Components được thêm

### 1. SharedProjectsModal

- **Đường dẫn**: `src/components/dashboard/SharedProjectsModal.tsx`
- **Chức năng**: Tìm kiếm và apply vào các project được chia sẻ
- **Features**:
  - Tìm kiếm theo tên, domain, mô tả
  - Tìm kiếm theo share code
  - Hiển thị thông tin project và owner
  - Apply button để tham gia project

### 2. AppliedProjectsModal

- **Đường dẫn**: `src/components/dashboard/AppliedProjectsModal.tsx`
- **Chức năng**: Quản lý các project đã apply
- **Features**:
  - Hiển thị danh sách project đã tham gia
  - Thông tin role và status
  - Leave project functionality
  - Pagination support

### 3. ProjectSharingModal

- **Đường dẫn**: `src/components/dashboard/ProjectSharingModal.tsx`
- **Chức năng**: Quản lý sharing settings cho project
- **Features**:
  - Toggle sharing on/off
  - Hiển thị và copy share code
  - Quản lý members (xem danh sách, remove members)
  - Real-time member count

## Redux State Management

### Actions được thêm

```typescript
// Shared projects
searchSharedProjects();
applyToProject();

// Applied projects
fetchAppliedProjects();
leaveAppliedProject();

// Project sharing
toggleProjectSharing();
fetchProjectMembers();
removeProjectMember();
```

### State Structure

```typescript
interface ProjectsState {
  // Existing state...

  // Shared Projects
  sharedProjects: SharedProject[];
  sharedProjectsPagination: PaginationState;

  // Applied Projects
  appliedProjects: ProjectMembership[];
  appliedProjectsPagination: PaginationState;

  // Project Members
  projectMembers: Record<string, ProjectMember[]>;

  // Filters
  sharedFilters: {
    search: string;
    shareCode: string;
  };
}
```

## UI Updates

### 1. Dashboard ProjectTabs

- Thêm button "Discover Projects" để mở SharedProjectsModal
- Thêm button "My Applied" để mở AppliedProjectsModal
- Hiển thị số lượng shared projects

### 2. ProjectsTable

- Thêm cột "Sharing" hiển thị sharing status
- Thêm button "Manage Sharing" cho mỗi project
- Hiển thị share code và member count

### 3. Project Actions

- **Share button**: Xanh lá nếu đang shared, xanh dương nếu chưa shared
- **View project**: Có thể xem cả own projects và applied projects
- **Edit permissions**: Chỉ owner mới có thể edit

## Cách sử dụng

### 1. Chia sẻ Project

1. Mở dashboard project
2. Click vào icon Share (ShareAltOutlined) trong project table
3. Toggle "Enable Sharing" trong modal
4. Copy share code để chia sẻ với người khác

### 2. Tham gia Project

1. Click button "Discover Projects" trong dashboard
2. Tìm kiếm project theo tên hoặc nhập share code
3. Click "Apply" để tham gia project
4. Project sẽ xuất hiện trong "My Applied Projects"

### 3. Quản lý Members (Owner only)

1. Mở ProjectSharingModal của project
2. Xem danh sách members trong phần "Project Members"
3. Remove members nếu cần thiết

### 4. Rời khỏi Project

1. Click "My Applied" trong dashboard
2. Tìm project muốn rời
3. Click "Leave" và confirm

## Security & Permissions

### Access Control

- **Project Owner**: Full access, quản lý sharing, thêm/xóa members
- **Project Member**: Read access, có thể view data nhưng không edit
- **Non-member**: Không thể truy cập project

### Share Code Security

- 12 ký tự alphanumeric uppercase
- Unique trong toàn bộ system
- Không thay đổi khi disable/enable lại sharing

## Error Handling

Tất cả API calls đều có error handling:

- Loading states cho UI feedback
- Error messages hiển thị qua Ant Design message
- Fallback data khi API fails

## Testing

Để test tính năng:

1. **Test Basic Flow**:

   ```bash
   # Enable sharing for a project
   # Search for shared projects
   # Apply to a project
   # Verify access permissions
   ```

2. **Test Edge Cases**:
   - Apply to own project (should fail)
   - Apply twice to same project (should fail)
   - Access project after leaving
   - Share code uniqueness

## Troubleshooting

### Common Issues

1. **Modal không hiển thị**: Kiểm tra import statements và component exports
2. **API calls fail**: Kiểm tra server endpoints và authentication
3. **State không update**: Verify Redux actions và reducers
4. **Permission errors**: Kiểm tra user role và project ownership

### Debug Tips

1. Check Redux DevTools để xem state changes
2. Network tab để debug API calls
3. Console logs trong components để trace execution

## Future Enhancements

- [ ] Role-based permissions (moderator role)
- [ ] Project invitations via email
- [ ] Activity feed cho shared projects
- [ ] Advanced search filters
- [ ] Project categories/tags
- [ ] Member approval workflow

## Changelog

**v2.0.0**

- ✅ Added project sharing functionality
- ✅ Shared projects discovery
- ✅ Applied projects management
- ✅ Member management for project owners
- ✅ UI updates for sharing indicators
- ✅ Redux state management integration
