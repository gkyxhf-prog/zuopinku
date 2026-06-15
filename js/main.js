// 主JavaScript文件
// 负责动态生成作品列表、筛选功能和模态框交互

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化作品列表
    renderWorks('all');
    
    // 绑定筛选按钮事件
    bindFilterButtons();
    
    // 绑定模态框关闭事件
    bindModalClose();
    
    // 绑定视频模态框关闭事件
    bindVideoModalClose();
    
    // 绑定图片模态框关闭事件
    bindImageModalClose();
    
    // 绑定图片点击事件
    bindImageClick();
    
    // 绑定导航链接平滑滚动
    bindSmoothScroll();
});

// 渲染作品列表
function renderWorks(filter) {
    const worksGrid = document.getElementById('worksGrid');
    worksGrid.innerHTML = '';
    
    // 根据筛选条件过滤作品
    const filteredWorks = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);
    
    // 如果没有作品，显示提示
    if (filteredWorks.length === 0) {
        worksGrid.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">暂无该分类的作品</p>';
        return;
    }
    
    // 遍历作品数据，生成卡片
    filteredWorks.forEach(project => {
        const card = document.createElement('div');
        card.className = 'work-card';
        card.dataset.id = project.id;
        
        card.innerHTML = `
            <img src="${project.cover}" alt="${project.title}" class="work-cover">
            <div class="work-info">
                <h3 class="work-title">${project.title}</h3>
                <div class="work-meta">
                    <span><i class="fas fa-paint-brush"></i>${project.software}</span>
                    <span><i class="fas fa-calendar"></i>${project.date}</span>
                </div>
            </div>
        `;
        
        // 点击卡片打开详情模态框
        card.addEventListener('click', function() {
            openModal(project);
        });
        
        worksGrid.appendChild(card);
    });
}

// 绑定筛选按钮事件
function bindFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(b => b.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');
            
            // 获取筛选条件并重新渲染作品列表
            const filter = this.dataset.filter;
            renderWorks(filter);
        });
    });
}

// 打开作品详情模态框
function openModal(project) {
    const modal = document.getElementById('workModal');
    const modalBody = document.getElementById('modalBody');
    
    // 生成模态框内容
    modalBody.innerHTML = `
        <img src="${project.cover}" alt="${project.title}" class="modal-cover">
        <h2 class="modal-title">${project.title}</h2>
        
        <div class="modal-details">
            <div class="modal-meta">
                <div class="modal-meta-item">
                    <i class="fas fa-paint-brush"></i>
                    <span>软件: ${project.software}</span>
                </div>
                <div class="modal-meta-item">
                    <i class="fas fa-calendar"></i>
                    <span>时间: ${project.date}</span>
                </div>
                <div class="modal-meta-item">
                    <i class="fas fa-folder"></i>
                    <span>分类: ${getCategoryName(project.category)}</span>
                </div>
            </div>
            
            <p class="modal-description">${project.description}</p>
            
            ${project.images.length > 0 ? `
            <div class="modal-gallery">
                <h4><i class="fas fa-images"></i> 展示图片</h4>
                <div class="gallery-grid">
                    ${project.images.map(img => `
                        <img src="${img}" alt="${project.title}" class="gallery-item">
                    `).join('')}
                </div>
            </div>
            ` : ''}
            
            ${project.videos && project.videos.length > 0 ? `
            <div class="modal-videos">
                <h4><i class="fas fa-video"></i> 展示视频</h4>
                <div class="video-grid">
                    ${project.videos.map(video => `
                        <div class="video-item" data-video="${video.url}">
                            <img src="${video.thumbnail}" alt="${video.name}" class="video-thumbnail">
                            <div class="play-icon"><i class="fas fa-play"></i></div>
                            <div class="video-name">${video.name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;
    
    // 显示模态框
    modal.classList.add('show');
    
    // 禁止页面滚动
    document.body.style.overflow = 'hidden';
}

// 绑定模态框关闭事件
function bindModalClose() {
    const modal = document.getElementById('workModal');
    const closeBtn = document.getElementById('closeModal');
    
    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', closeModal);
    
    // 点击模态框背景关闭模态框
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // 按ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('workModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// 打开视频播放模态框
function openVideoModal(videoUrl) {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // 设置视频源
    videoPlayer.src = videoUrl;
    
    // 显示视频模态框
    videoModal.classList.add('show');
    
    // 禁止页面滚动
    document.body.style.overflow = 'hidden';
}

// 关闭视频播放模态框
function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    
    // 暂停并重置视频
    videoPlayer.pause();
    videoPlayer.src = '';
    
    // 隐藏视频模态框
    videoModal.classList.remove('show');
    document.body.style.overflow = '';
}

// 绑定视频播放事件
function bindVideoPlay() {
    // 使用事件委托绑定视频点击事件
    document.getElementById('modalBody').addEventListener('click', function(e) {
        const videoItem = e.target.closest('.video-item');
        if (videoItem) {
            const videoUrl = videoItem.dataset.video;
            openVideoModal(videoUrl);
        }
    });
}

// 绑定视频模态框关闭事件
function bindVideoModalClose() {
    const videoModal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('closeVideo');
    
    // 点击关闭按钮关闭视频模态框
    closeBtn.addEventListener('click', closeVideoModal);
    
    // 点击视频模态框背景关闭
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // 按ESC键关闭视频模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('show')) {
            closeVideoModal();
        }
    });
}

// 获取分类名称
function getCategoryName(category) {
    const categories = {
        'character': '角色',
        'scene': '场景',
        'prop': '道具'
    };
    return categories[category] || '其他';
}

// 打开图片查看模态框
function openImageModal(imageUrl) {
    const imageModal = document.getElementById('imageModal');
    const imageViewer = document.getElementById('imageViewer');
    
    imageViewer.src = imageUrl;
    imageModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// 关闭图片查看模态框
function closeImageModal() {
    const imageModal = document.getElementById('imageModal');
    const imageViewer = document.getElementById('imageViewer');
    
    imageViewer.src = '';
    imageModal.classList.remove('show');
    document.body.style.overflow = '';
}

// 绑定图片点击事件
function bindImageClick() {
    document.getElementById('modalBody').addEventListener('click', function(e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const imageUrl = galleryItem.src;
            openImageModal(imageUrl);
        }
    });
}

// 绑定图片模态框关闭事件
function bindImageModalClose() {
    const imageModal = document.getElementById('imageModal');
    const closeBtn = document.getElementById('closeImage');
    
    closeBtn.addEventListener('click', closeImageModal);
    
    imageModal.addEventListener('click', function(e) {
        if (e.target === imageModal) {
            closeImageModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal.classList.contains('show')) {
            closeImageModal();
        }
    });
}

// 绑定导航链接平滑滚动
function bindSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 只有内部锚点链接（以#开头）才阻止默认行为并平滑滚动
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // 移除所有导航链接的active类
                    navLinks.forEach(l => l.classList.remove('active'));
                    // 添加当前链接的active类
                    this.classList.add('active');
                    
                    // 平滑滚动到目标位置
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
            // 外部链接（如market.html）则正常跳转，不阻止默认行为
        });
    });
}

// 页面滚动时更新导航状态
window.addEventListener('scroll', function() {
    const sections = ['home', 'works', 'about'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});