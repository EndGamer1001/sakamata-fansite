window.initializeSongs = function() {
    console.log('Initializing songs page');
    const songsContainer = document.getElementById('songs-container');
    const coversContainer = document.getElementById('covers-container');
    
    // 原創歌曲資料
    const songs = [
        {
            title: "人生リセットボタンぽちーｗ",
            releaseDate: "2022-02-26",
            youtubeId: "IxOjRtMv3Cg"
        },
        {
            title: "耀かし",
            releaseDate: "2022-03-26",
            description: "",
            youtubeId: "NmVGKfz0MEs"
        },

        {
            title: "Hurt you",
            releaseDate: "2022-04-30",
            description: "",
            youtubeId: "s7eDHROoBr4"
        },

        {
            title: "擬態ごっこ",
            releaseDate: "2023-01-07",
            description: "",
            youtubeId: "rtw9iea8QIw"
        },
        {
            title: "P.E.T.",
            releaseDate: "2023-03-15",
            description: "",
            youtubeId: "wztmSx2_T6w"
        },
        {
            title: "パラライズ",
            releaseDate: "2023-05-18",
            description: "",
            youtubeId: "rFbJlErkcGw"
        },
        {
            title: "右左君君右下上目きゅるんめちょかわ!",
            releaseDate: "2023-11-29",
            description: "",
            youtubeId: "u4PMVt_aGx0"
        },
        {
            title: "#チョコフレクロヱ",
            releaseDate: "2024-02-16",
            description: "",
            youtubeId: "1IZ_3uWKkwQ"
        },
        {
            title: "ラブフラストレーション",
            releaseDate: "2024-02-22",
            description: "",
            youtubeId: "PBOdbVfPo2w"
        },
        {
            title: "モードク",
            releaseDate: "2024-11-29",
            description: "",
            youtubeId: "G0dn1WU4kSs"
        }
    ];

    // Cover歌曲資料
    const covers = [
        {
            title: "おちゃめ機能",
            releaseDate: "2021-11-30",
            youtubeId: "nCyKjz-ie3c"
        },
        {
            title: "アニマル",
            releaseDate: "2022-02-22",
            youtubeId: "s-wDgxGCj4g"
        },
        {
            title: "偽物人間40号",
            releaseDate: "2022-05-18",
            youtubeId: "dHGM8bZ0qfg"
        },
        {
            title: "フクロウさん",
            releaseDate: "2022-05-29",
            youtubeId: "LI8TNKPuk3w"
        },
        {
            title: "キメラ",
            releaseDate: "2021-06-13",
            youtubeId: "geEGzouutR4"
        },
        {
            title: "怪物",
            releaseDate: "2022-08-24",
            youtubeId: "YFnkzhUyz18"
        },
        {
            title: "デイバイデイズ",
            releaseDate: "2022-09-20",
            youtubeId: "wLQQD3Ok0Uk"
        },
        {
            title: "光るなら",
            releaseDate: "2022-09-20",
            youtubeId: "zu0DHyWBwpM"
        },
        {
            title: "ゾンビ",
            releaseDate: "2022-10-09",
            youtubeId: "OCALS7xgtVI"
        },
        {
            title: "ジャックポットサッドガール",
            releaseDate: "2022-10-31",
            youtubeId: "QNSttxcjTAE"
        },
        {
            title: "毒林檎",
            releaseDate: "2022-12-03",
            youtubeId: "tgzUuNNFAP8"
        },
        {
            title: "アイデンティティ",
            releaseDate: "2022-12-30",
            youtubeId: "Jf1FvquhbU4"
        },
        {
            title: "hololive shuffle medley",
            releaseDate: "2023-01-01",
            youtubeId: "SirMcRmSEB4"
        },
        {
            title: "キャットラビング",
            releaseDate: "2023-02-22",
            youtubeId: "l2fKbktcyIs"
        },
        {
            title: "デビルじゃないもん",
            releaseDate: "2023-04-23",
            youtubeId: "JiEcWYf3Rog"
        },

        {
            title: "Perfect Crime",
            releaseDate: "2023-05-16",
            youtubeId: "XjfpkGSy8Q4"
        },

        {
            title: "アイドル",
            releaseDate: "2023-07-02",
            youtubeId: "o20gwmNgKvg"
        },

        {
            title: "サインはB",
            releaseDate: "2023-10-02",
            youtubeId: "hUchhqq0fpA"
        },

        {
            title: "Crazy Scary Holy Fantasy",
            releaseDate: "2023-10-30",
            youtubeId: "9EAIDwXj4Jk"
        },

        {
            title: "Femme Fatale",
            releaseDate: "2023-11-09",
            youtubeId: "om-51wRJpYI"
        },
        {
            title: "劣等上等",
            releaseDate: "2023-11-20",
            youtubeId: "bW3K8MCfE0g"
        },

        {
            title: "ジングルベルがとまらない",
            releaseDate: "2023-12-18",
            youtubeId: "MnOmJV8ho08"
        },
        {
            title: "お呪い",
            releaseDate: "2024-01-27",
            youtubeId: "wnjuq2cX2JM"
        },
        
        {
            title: "らぶびーむ！！",
            releaseDate: "2024-02-14",
            youtubeId: "E1iij_aF74s"
        },
        {
            title: "ハピチョコ",
            releaseDate: "2024-02-14",
            youtubeId: "BCt3E-FJFdA"
        },


        {
            title: "うぉんちゅーばっど",
            releaseDate: "2024-03-01",
            youtubeId: "P5IugTtjEwU"
        },
        {
            title: "アンノウン・マザーグース",
            releaseDate: "2024-03-09",
            youtubeId: "8bkICbOt1ck"
        },
        {
            title: "ラビットホール",
            releaseDate: "2024-06-07",
            youtubeId: "WYKCz9hbXkY"
        },

        
        



    ];

    // 渲染歌曲列表（共用函數）
    function renderSongList(container, songList) {
        if (!container) return;

        container.innerHTML = songList.map(song => `
            <div class="song-card">
                <a href="https://www.youtube.com/watch?v=${song.youtubeId}" target="_blank" class="song-link">
                    <div class="song-thumbnail">
                        <img src="https://img.youtube.com/vi/${song.youtubeId}/maxresdefault.jpg" 
                             alt="${song.title}" 
                             loading="lazy">
                        <div class="play-overlay">
                            <span class="play-icon">▶</span>
                        </div>
                    </div>
                    <div class="song-info">
                        <h3 class="song-title">${song.title}</h3>
                        <p class="song-date">${formatDate(song.releaseDate)}</p>
                    </div>
                </a>
            </div>
        `).join('');
    }

    // 格式化日期
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // 搜尋功能
    let searchTimeout;
    const searchInput = document.querySelector('.song-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredSongs = songs.filter(song =>
                    song.title.toLowerCase().includes(searchTerm)
                );
                const filteredCovers = covers.filter(song =>
                    song.title.toLowerCase().includes(searchTerm)
                );
                renderSongList(songsContainer, filteredSongs);
                renderSongList(coversContainer, filteredCovers);
            }, 300);
        });
    }

    // 初始化
    renderSongList(songsContainer, songs);
    renderSongList(coversContainer, covers);
};

// 保留原有的 DOMContentLoaded 監聽
document.addEventListener('DOMContentLoaded', () => {
    console.log('Songs DOMContentLoaded triggered');
    window.initializeSongs();
});
