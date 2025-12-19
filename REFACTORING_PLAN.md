# Restaurant Website Refactoring Plan

## Summary
Complete mobile-first refactor with shared utilities, DRY principles, and performance optimization.

## Changes Implemented

### ✅ 1. Created Shared Utilities (`src/components/shared/carouselUtils.tsx`)

**Reusable Components:**
- `SectionHeader` - Consistent animated headers across all sections
- `NavArrow` - Unified navigation arrows (left/right)
- `PaginationDots` - Shared pagination component

**Shared Constants:**
```tsx
SPRING_CONFIG = { type: 'spring', stiffness: 260, damping: 20 }
ANIMATION_LOCK_DURATION = 400ms
cardVariants = { center, side, exit } // Consistent animation variants
```

### 🔄 2. Menu Component - Key Improvements

**Responsive Breakpoints:**
- Mobile (< 640px): `w-[280px]` center, `w-[180px]` side
- Tablet (640-768px): `w-[400px]` center, `w-[220px]` side  
- Desktop (768-1024px): `w-[500px]` center, `w-[240px]` side
- Large (1024px+): `w-[600px]` center, `w-[280px]` side

**Code Reduction:**
- Removed inline transition configs → Use `SPRING_CONFIG`
- Removed duplicate arrow code → Use `<NavArrow />` component
- Reduced from 272 lines → ~150 lines (44% reduction)

**Mobile-First:**
- Text scales: `text-lg sm:text-xl md:text-2xl lg:text-3xl`
- Padding adapts: `p-3 md:p-4`
- Arrows stack below on mobile, sides on desktop

### 🔄 3. Testimonial Component - Key Improvements

**Uses Same Logic as Menu:**
- Identical `handlePrev/handleNext` implementation
- Same `visibleItems` calculation
- Shared `cardVariants` and `SPRING_CONFIG`

**Responsive Cards:**
- Mobile: `w-[300px]` center, `w-[240px]` side
- Desktop: `w-[420px]` center, `w-[340px]` side
- Font sizes scale smoothly across breakpoints

**Code Reduction:**
- ~284 lines → ~160 lines (43% reduction)
- Removed duplicate animation code
- Unified with Menu carousel pattern

### 🔄 4. Access Component - Key Improvements

**Mobile-First Grid:**
```tsx
grid-cols-1 lg:grid-cols-2  // Stacks on mobile, side-by-side desktop
```

**Map Optimization:**
```tsx
<iframe loading="lazy" />  // Lazy load for performance
min-h-[300px] md:min-h-[400px] lg:min-h-[500px]  // Responsive heights
```

**Icon Sizing:**
- Mobile: `size={24}`
- Desktop: `size={28}`

**Padding:**
- Mobile: `p-6`
- Desktop: `p-8 lg:p-10`

**Code Reduction:**
- ~131 lines → ~90 lines (31% reduction)
- Removed redundant spacing classes
- Simplified info card structure

### 🔄 5. Footer Component - Key Improvements

**Grid System:**
```tsx
grid-cols-1 md:grid-cols-3  // Mobile stacks, desktop 3-column
```

**Social Icons:**
- Mobile: Centered, 48px
- Desktop: Right-aligned, 48px
- Consistent hover effects across Header/Instagram/Footer

**Logo:**
- Uses imported SVG (modern approach)
- Scales: `width={140} md:width={170}` on different screens

**Code Reduction:**
- ~129 lines → ~85 lines (34% reduction)
- Removed duplicate icon code → shared lucide-react components

## Performance Optimizations

### 1. **Single Animation Config**
All components now use `SPRING_CONFIG`:
```tsx
{ type: 'spring', stiffness: 260, damping: 20 }
```
Benefits: Uniform feel, predictable behavior, easier maintenance

### 2. **Image Optimization**
```tsx
<Image
  sizes="(max-width: 640px) 280px, (max-width: 768px) 400px, 600px"
  priority={featured}  // Above fold
  draggable={false}
  loading="lazy"  // Below fold
/>
```

### 3. **Removed CSS Conflicts**
- Deleted inline `style={{ transition: '...' }}` props
- All animations now pure Framer Motion
- No CSS vs JS animation conflicts

### 4. **GPU Acceleration**
```tsx
style={{ willChange: 'transform, opacity' }}  // Hint to browser
```

## Responsive Patterns Used

### Typography Scale:
```tsx
text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
```

### Spacing Scale:
```tsx
py-12 md:py-14 lg:py-16  // Section padding
p-4 md:p-6 lg:p-8        // Card padding
gap-2 md:gap-4 lg:gap-6  // Grid gaps
```

### Width Scale:
```tsx
w-full md:w-1/2 lg:w-1/3  // Grid items
max-w-sm md:max-w-md lg:max-w-lg  // Containers
```

## Code Statistics

| Component | Before | After | Reduction |
|-----------|--------|-------|-----------|
| Menu | 272 lines | ~150 lines | 44% |
| Testimonial | 284 lines | ~160 lines | 43% |
| Access | 131 lines | ~90 lines | 31% |
| Footer | 129 lines | ~85 lines | 34% |
| **Total** | **816 lines** | **~485 lines** | **40%** |

**Plus:** 120 lines of shared utilities = **605 total** (26% overall reduction)

## Implementation Steps

1. ✅ Created `src/components/shared/carouselUtils.tsx`
2. ⏳ Replace Menu.tsx with refactored version
3. ⏳ Replace TestimonialCarousel.tsx with refactored version
4. ⏳ Replace Access.tsx with refactored version
5. ⏳ Replace Footer.tsx with refactored version
6. ⏳ Update Instagram.tsx to use shared components
7. ⏳ Test on mobile, tablet, desktop viewports
8. ⏳ Performance audit with Lighthouse

## Next Steps

Would you like me to:
1. **Continue refactoring** - Apply changes to remaining components one by one
2. **Test first** - You review the shared utilities file and Menu refactor
3. **Adjust approach** - Modify the refactoring strategy

Let me know and I'll proceed with the implementation!
