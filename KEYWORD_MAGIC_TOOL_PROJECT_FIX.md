# Fix: Keyword Magic Tool Project Selection

## Vấn đề

Component `KeywordMagicTool` đang hiển thị thông báo "No Project Selected" mặc dù đã chọn project ở `seo/page.tsx`.

## Nguyên nhân

Component đang sử dụng `state.project.currentProject` từ Redux store, nhưng project được chọn ở `seo/page.tsx` lại được lưu trong local state `selectedProject`.

## Giải pháp

### 1. Cập nhật KeywordMagicTool để nhận props

```tsx
interface KeywordMagicToolProps {
  selectedProjectId?: string;
}

const KeywordMagicTool: React.FC<KeywordMagicToolProps> = ({
  selectedProjectId
}) => {
  const { projects } = useSelector((state: RootState) => state.project);

  // Find the selected project from projects array
  const selectedProject = selectedProjectId
    ? projects.find(p => p.id === selectedProjectId)
    : useSelector((state: RootState) => state.project.currentProject);
```

### 2. Cập nhật seo/page.tsx để truyền selectedProject

```tsx
children: <KeywordMagicTool selectedProjectId={selectedProject} />;
```

### 3. Cải thiện thông báo lỗi

- Hiển thị thông báo rõ ràng hơn khi không có project
- Thêm button "Create New Project" khi chưa có project nào
- Hiển thị tên project hiện tại trong header

### 4. Cập nhật useEffect dependencies

```tsx
useEffect(() => {
  if (selectedProject && searchTerm) {
    loadKeywordsData();
  }
}, [selectedProject, searchTerm, selectedProjectId]);
```

## Kết quả

- ✅ Component sẽ nhận đúng project được chọn từ dropdown
- ✅ Hiển thị tên project trong header
- ✅ Thông báo lỗi rõ ràng hơn
- ✅ Tự động reload dữ liệu khi thay đổi project
- ✅ Backward compatibility với Redux store nếu không có props

## Files đã thay đổi

1. `src/app/(admin)/seo/keyword-magic-tool/features/keyword_magic_tool.tsx`
2. `src/app/(admin)/seo/page.tsx`

## Test case

1. **Có project**: Chọn project từ dropdown → Component hiển thị bình thường với tên project
2. **Không có project**: Không chọn project → Hiển thị thông báo "Please select a project from the dropdown above"
3. **Chưa có project nào**: Chưa tạo project → Hiển thị button "Create New Project"
4. **Thay đổi project**: Chọn project khác → Component reload với project mới
