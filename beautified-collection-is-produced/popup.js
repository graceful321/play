const button = document.getElementById("confirm");

function traverseNode(node, result = ["</DL><p>"]) {
    let i;
    if (node.title !== '' && node.title !== '思源link' && node.title !== '收藏夹栏' && node.title !== '其他收藏夹' && node.title !== '已删除收藏夹') {
        let titleLog = node.title;
        let urlLog = node.url;
        if (urlLog !== undefined) {
            result.push('<DT><A HREF="' + urlLog + '">' + titleLog + '</A>');
        } else {
            result.push('</DL><p><DT><H3>' + titleLog + '</H3></DL><p>');
        }
    }

    if (node.children && node.children.length > 0) {
        for (i = 0; i < node.children.length; i++) {
            traverseNode(node.children[i], result);
        }
    }
    return result;
}

// 生成HTML格式的收藏夹数据
function generateHtmlFromBookmarks(bookmarks) {
    let html = '<!DOCTYPE html>\n' +
        '<html lang="en">\n' +
        '<head>\n' +
        '    <meta charset="UTF-8">\n' +
        '    <!-- 小图标 -->\n' +
        '    <link rel="shortcut icon"\n' +
        '          href="https://gpt.91chat-ai.com/logo.png"\n' +
        '          type="images/x-ico"/>\n' +
        '    <title>思源_link</title>\n' +
        '    <style>\n' +
        '\n' +
        '        body {\n' +
        '            margin: 0;\n' +
        '            padding: 0;\n' +
        '        }\n' +
        '\n' +
        '        .gf {\n' +
        '            display: flex;\n' +
        '            align-items: center; /*内容垂直居中*/\n' +
        '            position: sticky;\n' +
        '            top: 0;\n' +
        '        }\n' +
        '\n' +
        '        .search {\n' +
        '            display: inline-block;\n' +
        '            position: relative;\n' +
        '            height: 35px;\n' +
        '            width: 35px;\n' +
        '            box-sizing: border-box;\n' +
        '            margin: 0 7px 7px 0;\n' +
        '            padding: 0 9px 0 20px;\n' +
        '            border: 3px solid blueviolet;\n' +
        '            border-radius: 25px;\n' +
        '            transition: all 200ms ease;\n' +
        '            cursor: text;\n' +
        '        }\n' +
        '\n' +
        '        .search::after {\n' +
        '            content: "";\n' +
        '            position: absolute;\n' +
        '            width: 3px;\n' +
        '            height: 20px;\n' +
        '            right: -5px;\n' +
        '            top: 21px;\n' +
        '            background-color: blueviolet;\n' +
        '            border-radius: 3px;\n' +
        '            transform: rotate(-45deg);\n' +
        '            transition: all 200ms ease;\n' +
        '        }\n' +
        '\n' +
        '        .search.active,\n' +
        '        .search:hover {\n' +
        '            width: 200px;\n' +
        '            margin-right: 0;\n' +
        '        }\n' +
        '\n' +
        '        .search.active::after {\n' +
        '            height: 0;\n' +
        '        }\n' +
        '\n' +
        '        input {\n' +
        '            width: 100%;\n' +
        '            border: none;\n' +
        '            box-sizing: border-box;\n' +
        '            font-family: Helvetica, serif;\n' +
        '            font-size: 15px;\n' +
        '            color: inherit;\n' +
        '            background: transparent;\n' +
        '            outline-width: 0;\n' +
        '        }\n' +
        '\n' +
        '        ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */\n' +
        '            color: blueviolet;\n' +
        '            opacity: 1; /* Firefox */\n' +
        '        }\n' +
        '\n' +
        '        :-ms-input-placeholder { /* Internet Explorer 10-11 */\n' +
        '            color: blueviolet;\n' +
        '        }\n' +
        '\n' +
        '        ::-ms-input-placeholder { /* Microsoft Edge */\n' +
        '            color: blueviolet;\n' +
        '        }\n' +
        '\n' +
        '        .a1 {\n' +
        '            position: fixed;\n' +
        '            left: 0;\n' +
        '            right: 0;\n' +
        '            z-index: 9999;\n' +
        '            width: 60%;\n' +
        '            min-width: 900px;\n' +
        '            margin: 2px auto;\n' +
        '            background-color: rgba(255, 255, 255, 0.4);\n' +
        '            line-height: 30px;\n' +
        '            max-height: 98.8%;\n' +
        '            padding: 5px;\n' +
        '            box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.6);\n' +
        '            display: block;\n' +
        '            overflow-y: auto; /* 添加 overflow 属性 */\n' +
        '            scrollbar-width: none; /* 隐藏滚动条 */\n' +
        '            -ms-overflow-style: none; /* 隐藏滚动条 (IE 和 Edge) */\n' +
        '            opacity: 0; /* 元素初始透明 */\n' +
        '            transition: opacity 1s linear; /* 定义过渡效果 */\n' +
        '        }\n' +
        '\n' +
        '        .show {\n' +
        '            opacity: 1; /* 显示元素时设为不透明 */\n' +
        '        }\n' +
        '\n' +
        '        .hide {\n' +
        '            opacity: 0; /* 隐藏元素时设为透明 */\n' +
        '        }\n' +
        '\n' +
        '        .a1::-webkit-scrollbar {\n' +
        '            display: none; /* 隐藏滚动条 (Chrome 和 Safari) */\n' +
        '        }\n' +
        '\n' +
        '        a:link, a:visited {\n' +
        '            color: black;\n' +
        '            text-decoration: none;\n' +
        '            background-image: repeating-radial-gradient(rgb(138, 44, 44), rgb(162, 0, 255), rgb(255, 0, 119));\n' +
        '            background-size: 0 2px;\n' +
        '            background-repeat: no-repeat;\n' +
        '            background-position: right bottom;\n' +
        '            transition: background-size .5s ease-out;\n' +
        '        }\n' +
        '\n' +
        '        #hoverEffect, a:hover {\n' +
        '            color: rgb(255, 0, 221);\n' +
        '            text-decoration: none;\n' +
        '            background-size: 100% 2px;\n' +
        '            background-position: left bottom;\n' +
        '        }\n' +
        '\n' +
        '        a:active {\n' +
        '            color: #3F0;\n' +
        '            text-decoration: line-through;\n' +
        '        }\n' +
        '\n' +
        '        .a1 H3 {\n' +
        '            margin-left: 20px;\n' +
        '        }\n' +
        '\n' +
        '        .a1 DT A {\n' +
        '            margin-left: 40px;\n' +
        '        }\n' +
        '\n' +
        '        #image-container {\n' +
        '            position: relative;\n' +
        '        }\n' +
        '\n' +
        '        #image-container img, #image-container video {\n' +
        '            float: right;\n' +
        '            position: fixed;\n' +
        '            left: 0;\n' +
        '            top: 0;\n' +
        '            height: 100%;\n' +
        '            width: 100%;\n' +
        '            object-fit: cover;\n' +
        '            opacity: 0;\n' +
        '            animation: fadeinout 14s infinite;\n' +
        '            backface-visibility: hidden;\n' +
        '        }\n' +
        '\n' +
        '        @keyframes fadeinout {\n' +
        '            0% {\n' +
        '                opacity: 0;\n' +
        '            }\n' +
        '            20% {\n' +
        '                opacity: 1;\n' +
        '            }\n' +
        '            100% {\n' +
        '                opacity: 1;\n' +
        '            }\n' +
        '        }\n' +
        '    </style>\n' +
        '    <base target="_blank"/>\n' +
        '</head>\n' +
        '<body>\n' +
        '\n' +
        '<!-- 网址 -->\n' +
        '<div class="a1" id="bdy">\n' +
        '\n' +
        '    <div class="gf">\n' +
        '        <p style="font-size: 20px;"><strong>思源网址</strong></p>\n' +
        '        &nbsp;&nbsp;&nbsp;\n' +
        '        <label class="search" for="inpt_search">\n' +
        '            <input id="inpt_search" type="text" placeholder="思源搜索" onclick="this.select()"\n' +
        '                   onkeydown="handleKeyDown(event)"/>\n' +
        '        </label><!--输入框-->\n' +
        '    </div>';

    const node = traverseNode(bookmarks[0])
    for (let i = 0; i < node.length; i++) {
        html += node[i]
    }

    html += '</div>\n' +
        '\n' +
        '<!-- 背景渐变位置 -->\n' +
        '<div id="image-container"></div>\n' +
        '\n' +
        '<!-- 搜索 -->\n' +
        '<script>\n' +
        '\n' +
        '    let ST = \'\';// 之前搜索内容\n' +
        '    let currentIndex = 0; // 当前搜索的索引位置\n' +
        '    let txt; // 记录上一次的元素\n' +
        '\n' +
        '    function handleKeyDown(event) {\n' +
        '        if (event.keyCode === 13) { // 判断是否按下回车键\n' +
        '            search();\n' +
        '        }\n' +
        '    }\n' +
        '\n' +
        '    function search() {\n' +
        '        const searchText = document.getElementById(\'inpt_search\').value; // 获取搜索关键字\n' +
        '        if (txt !== undefined) { // 清除之前那个id\n' +
        '            txt.removeAttribute(\'id\');\n' +
        '        }\n' +
        '        if (searchText === "") { //判断搜索内容是否为空\n' +
        '            alert("搜索内容不能为空");\n' +
        '            return;\n' +
        '        }\n' +
        '        if (searchText !== ST) { //判断搜索内容是否改变，若改变，索引重置\n' +
        '            currentIndex = 0;\n' +
        '            ST = searchText;\n' +
        '        }\n' +
        '\n' +
        '        // 获取搜索范围元素\n' +
        '        const searchContainer = document.getElementById(\'bdy\');\n' +
        '\n' +
        '        // 查找searchContainer里面所有标题元素\n' +
        '        const titles = searchContainer.querySelectorAll(\'a, H3\');\n' +
        '\n' +
        '        // 在剩余的标题元素中进行搜索\n' +
        '        for (let i = currentIndex; i < titles.length; i++) {\n' +
        '            const titleElement = titles[i];\n' +
        '\n' +
        '            // 判断标题文本是否包含搜索文本\n' +
        '            if (titleElement.textContent.includes(searchText)) {\n' +
        '                // 输出标题文本\n' +
        '                txt = titleElement;\n' +
        '                // 找到后突出显示，添加id\n' +
        '                titleElement.id = \'hoverEffect\';\n' +
        '\n' +
        '                // 为元素添加mouseover事件\n' +
        '                titleElement.addEventListener(\'mouseover\', function () {\n' +
        '                    // 在鼠标悬停时清除元素的id\n' +
        '                    this.removeAttribute(\'id\');\n' +
        '                });\n' +
        '\n' +
        '                //"start": 滚动到目标元素的开头位置。\n' +
        '                //"center": 滚动到目标元素的中间位置。\n' +
        '                //"end": 滚动到目标元素的末尾位置。\n' +
        '                //"nearest": 根据视口大小和元素位置自动选择滚动位置，使得目标元素尽可能地可见。\n' +
        '                titleElement.scrollIntoView({behavior: "smooth", block: "center"});\n' +
        '\n' +
        '                currentIndex = i + 1; // 更新当前搜索的索引位置\n' +
        '                return; // 结束当前搜索，等待下一次按下回车键\n' +
        '            }\n' +
        '        }\n' +
        '        if (currentIndex === 0) { // 判断找没找到\n' +
        '            alert("未找到");\n' +
        '        } else {\n' +
        '// 当搜索到最后一个标题时，重置索引位置，从头开始搜索\n' +
        '            currentIndex = 0;\n' +
        '        }\n' +
        '    }\n' +
        '</script>\n' +
        '\n' +
        '<!-- 背景渐变功能 -->\n' +
        '<script>\n' +
        '    const prt = document.getElementById("image-container");\n' +
        '    const currentImageIndex = 0;\n' +
        '    const num = 0;\n' +
        '    const books = [\n' +
        '        // 王者荣耀\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/154/154-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/154/154-bigskin-8.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/141/141-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/141/141-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/141/141-bigskin-8.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/141/141-bigskin-9.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/121/121-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/167/167-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/167/167-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/169/169-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/168/168-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/124/124-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/128/128-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/156/156-bigskin-1.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/156/156-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/156/156-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/146/146-bigskin-2.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/146/146-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/146/146-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/142/142-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/107/107-bigskin-10.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/110/110-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/133/133-bigskin-9.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/135/135-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/111/111-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/111/111-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/111/111-bigskin-8.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/111/111-bigskin-10.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/116/116-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/109/109-bigskin-2.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/109/109-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/109/109-bigskin-9.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/109/109-bigskin-10.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/108/108-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/144/144-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/150/150-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/106/106-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/106/106-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/152/152-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/152/152-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/152/152-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/129/129-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/129/129-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/113/113-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/113/113-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/118/118-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/136/136-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/126/126-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/127/127-bigskin-1.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/127/127-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/134/134-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/148/148-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/131/131-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/131/131-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/140/140-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/149/149-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/153/153-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/155/155-bigskin-2.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/157/157-bigskin-2.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/157/157-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/162/162-bigskin-2.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/162/162-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/163/163-bigskin-2.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/163/163-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/170/170-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/170/170-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/173/173-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/174/174-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/174/174-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/183/183-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/184/184-bigskin-2.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/184/184-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/190/190-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/190/190-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/191/191-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/187/187-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/182/182-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/182/182-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/182/182-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/195/195-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/198/198-bigskin-1.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/179/179-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/199/199-bigskin-1.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/199/199-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/199/199-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/199/199-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/199/199-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/176/176-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/176/176-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/502/502-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/502/502-bigskin-7.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/197/197-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/137/137-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/508/508-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/507/507-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/507/507-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/513/513-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/513/513-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/515/515-bigskin-1.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/515/515-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/515/515-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/529/529-bigskin-2.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/505/505-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/505/505-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/505/505-bigskin-6.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/522/522-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/522/522-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/518/518-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/523/523-bigskin-1.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/523/523-bigskin-2.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/523/523-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/531/531-bigskin-4.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/531/531-bigskin-5.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/536/536-bigskin-2.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/536/536-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/528/528-bigskin-3.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/538/538-bigskin-1.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/542/542-bigskin-1.jpg",\n' +
        '        "https://game.gtimg.cn/images/yxzj/img201606/skin/hero-info/521/521-bigskin-2.jpg",\n' +
        '\n' +
        '        // 英雄联盟\n' +
        '        "https://game.gtimg.cn/images/lol/act/img/skin/big_46358cd4-3f36-4987-9db8-aab046adf43f.jpg",\n' +
        '        "https://game.gtimg.cn/images/lol/act/img/skin/big37000.jpg",\n' +
        '        "https://game.gtimg.cn/images/lol/act/img/skin/big_0d4018bf-0288-40f5-a9fc-1422a37d9365.jpg",\n' +
        '        "https://game.gtimg.cn/images/lol/act/img/skin/big142000.jpg",\n' +
        '        "https://game.gtimg.cn/images/lol/act/img/skin/big147000.jpg",\n' +
        '        "https://game.gtimg.cn/images/lol/act/img/skin/big350000.jpg",\n' +
        '\n' +
        '        // 三国杀\n' +
        '        "https://web.sanguosha.com/10/pc/res/assets/runtime/mainLoading/loadingBg1.jpg",\n' +
        '\n' +
        '        // Apex\n' +
        '        "https://m.qpic.cn/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5qtFZgzHlB1GwV1lOaapwy5hsKR42U5InRxxbTnc.38*8Ohso.*7qcM*Ac2sFQk.mmLK.3T9pStxTG.oGygsEvM!/b&bo=wAdgBMAHYAQDByI!&rf=viewer_4&t=5",\n' +
        '        "https://m.qpic.cn/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5sf7Yr2N*cl3zuRozettHH0guvcEGJUa.hWn1Ba4yoLGIlUtbak.5TeeiixWK7il76IWloNWOExGnE4SbXnHmdo!/b&bo=wAdgBMAHYAQDd1I!&rf=viewer_4&t=5",\n' +
        '        "https://m.qpic.cn/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5sf7Yr2N*cl3zuRozettHH37USwSs0QnznlL3*ezUrlnqydx3Pd1qYtp29PRbam6*t97TZ6JTMQL5fRBAr7ogsU!/b&bo=wAdgBMAHYAQDh6I!&rf=viewer_4&t=5",\n' +
        '        "https://m.qpic.cn/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5podXK3wPgo.FHbT.AO.MvWRNGjHJ8qNFMnhMzpwvInO1HhjxBrbzHrKmG7zYp0wOZw9pCUqg9kywDwWnZAKJbU!/b&bo=wAdgBMAHYAQDh6I!&rf=viewer_4&t=5",\n' +
        '        "https://m.qpic.cn/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5podXK3wPgo.FHbT.AO.MvUJArXcpQJHIi0q0pBZzFMfXjJe4ygvkndGh.hfvIUaSBtOKXSJPwdqM9KJJgk0yNg!/b&bo=wAdgBMAHYAQDd1I!&rf=viewer_4&t=5",\n' +
        '\n' +
        '        // 隐形守护者\n' +
        '        "https://m.qpic.cn/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5n9fLOFwm4En.HC5BOqwKQvXNSLQ8SB6AjsdchtLgvVY.WBqTHKe0b*oCOb2G6ZZnwn03yMXicNEvlTOzHjfOaQ!/b&bo=gAc4BIAHOAQBByA!&rf=viewer_4&t=5",\n' +
        '\n' +
        '        // 崩坏三\n' +
        '        "http://r.photo.store.qq.com/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5u43iW3NgBY6QqPh72FunbcR9zQqToAyH0xWtWSow1bAyTedhmhpKz1wbZl46aEadLiGYQynVaY4o1.zWih1KoA!/r",\n' +
        '        "http://r.photo.store.qq.com/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5u43iW3NgBY6QqPh72FunbflluxBs.1.nxoaJsrp1*VnA1FQUqON29VHoxjbse*jqmPr043JaegFzbzOJxyDmYk!/r",\n' +
        '        "http://r.photo.store.qq.com/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5u43iW3NgBY6QqPh72Funbem4t3FxuYWNnsfun4W9HyT4915G*1Yvl4HOQnJnInOXG186Ic6qSb9.e2dPfKQtAo!/r",\n' +
        '        "https://uploadstatic.mihoyo.com/contentweb/20200921/2020092118042667447.png",\n' +
        '        "https://webstatic.mihoyo.com/upload/contentweb/2022/08/16/0b8632a0c1501c7de882cb08789fcf0c_1230141489251612305.png",\n' +
        '        "https://act-webstatic.mihoyo.com/upload/contentweb/bh3/5166b9ef2256fc6c19b426e3c72d794f_7824440040419994538.png",\n' +
        '        "https://webstatic.mihoyo.com/upload/contentweb/2023/03/08/a363a7f7b6246298ecd46649af83e027_751542683283143333.png",\n' +
        '        "https://webstatic.mihoyo.com/upload/contentweb/2022/09/28/6028a07f6dd6c6e981f72f7592be59d7_1113189012802803565.png",\n' +
        '\n' +
        '        // 其他\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/245b6dcc819dc19fbe72a4239c34324d.jpg",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/a7515f19896e2ae67fa28a622a87ecc8.jpg",\n' +
        '        "https://m.qpic.cn/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5jmndBJUtTZe26AU.xyliAD9cw3XGV6o5uuuaaclOsK28ArHLrQwzgxdpoIJfculeFKx7bDTCisM7smmgVUijko!/b&bo=gAc4BIAHOAQBFzA!&rf=viewer_4&t=5",\n' +
        '        "https://m.qpic.cn/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5gic00*S*3mVYrBLTp9jgsdg8unYVgQ01EL5fn*MK2q7gzbwcnkGOcDKV15Oed9nizi*9k9BmS*ylSSKjFn*YH0!/b&bo=4wgABeMIAAUBJwA!&rf=viewer_4&t=5",\n' +
        '        "https://m.qpic.cn/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5gic00*S*3mVYrBLTp9jgse.Nc4.HUW6qXZdPBxybT9ZLTI0nk*8l0VeyvVwhIUeXSEJH3T6p1vx9KgJFYybJRE!/b&bo=8wgABfMIAAUBJwA!&rf=viewer_4&t=5",\n' +
        '        "https://m.qpic.cn/psc?/V13p5BYh04zTRc/ruAMsa53pVQWN7FLK88i5gic00*S*3mVYrBLTp9jgsfzU1zzOs20vDLuM3a5mBY.hvd8vQJJgkT*IS04C.lQ266Zl*3nRhZ9Ev3SJG5xwKs!/b&bo=zQgABc0IAAUBFzA!&rf=viewer_4&t=5",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/cec6240b39e56550894f486c35743f01.jpg",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/aedffb9a9cc27329debcb1dc812a8e67.jpg",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/bfeb54a215c9f727782e35ccc24c4a4a.jpg",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/3466770f050e8d0c526ddca35d158cff.jpg",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/6af578047e885698d67f6b0e82b6728f.jpg",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/6d76c21cf428337d8e6ebc3e883585e3.jpg",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/28594c130fd4d0526f6e078be221a0d0.jpg",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/static/f0fc3c461a21da923b1304b1ec26ddee.jpg",\n' +
        '\n' +
        '        // mp4\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/e2936aee039fe7e1d8c23e98778dcce6_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/1d344cce0e42d27e5fa4c02da0682130_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/efee60148d15f121e3b230a65c497cf4_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/a3fdccbc113c1e6d089343f0ca2db60c_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/b083c980dea052b0ca08aec6c98eb565_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/2e837d98c2a0dd6a0fafe8aa136aa729_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/f2f25309d54a72504b95facc2451e1b1_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/e5aabfbd6d35ed3d802b3b71d832492b_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/c3f3ff28990eadecb8d23ad6a7816145_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/61880374ce457854525ee2c7e55c037d_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/f745b7ba405a4d5beb9d858b0cb4dc7e_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/197eab8cbd05e210bb1f3081093665ec_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/312e2bb7c70048af9e952f4f63b57b56_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/caa7e26a44938d7dc34bde2e2ac9ac35_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/191dcaa5ac8c657ac7a68be446260cd6_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/36714de4ed69bdccdcc4f99b550971f9_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/565812bc853c290346a6e734bcea86d8_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/d0e75f11ec9cdd5116c0071fae591f7e_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/93805fb891c324b51c158c364f154d0b_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/9910e67fcf459eec59285a6867b64dab_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/02221d7611b2ed0441297a1c8c568230_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/5b1207250c6793f1cb15e1fcb3ee61b5_preview.mp4",\n' +
        '        "https://img-baofun.zhhainiao.com/pcwallpaper_ugc/preview/92299bca1c2f84e330724da868767450_preview.mp4",\n' +
        '\n' +
        '        //"https:",\n' +
        '    ];//直接输入图片网址\n' +
        '\n' +
        '    const rm = [];\n' +
        '    let l = 0;\n' +
        '    let n;\n' +
        '    let sum = 1;\n' +
        '\n' +
        '    // 获取URL的后缀，用于判断是什么文件\n' +
        '    function getFileExtension(url) {\n' +
        '        return url.split(\'.\').pop();\n' +
        '    }\n' +
        '\n' +
        '    // 选择并设置背景\n' +
        '    function addImage() {\n' +
        '\n' +
        '        if (l == 0) {\n' +
        '            l = books.length;\n' +
        '            for (const i in books) {\n' +
        '                rm[i] = i;\n' +
        '            }\n' +
        '            console.log(new Date().toLocaleString() + " 第" + sum++ + "次轮播，共" + l + "个背景链接，预计" + l * 10 / 60 + "分" + l * 10 % 60 + "秒循环一次");\n' +
        '        }\n' +
        '\n' +
        '        const index = Math.floor(Math.random() * l--); // 随机生成一个索引，随机取出数组中的一个元素，并将数组长度减一\n' +
        '        n = rm.splice(index, 1)[0]; // 输出取出的元素，并从数组中删除该元素\n' +
        '        let url = books[n];\n' +
        '\n' +
        '        if (getFileExtension(url) == \'mp4\') {\n' +
        '            // mp4\n' +
        '            const video = document.createElement(\'video\');\n' +
        '            video.src = url;\n' +
        '            // 设置自动播放\n' +
        '            video.autoplay = true;\n' +
        '            // 设置循环播放\n' +
        '            video.loop = true;\n' +
        '            // 设置静音\n' +
        '            video.muted = true;\n' +
        '\n' +
        '            video.onloadeddata = function () {\n' +
        '                prt.appendChild(video);\n' +
        '            }\n' +
        '        } else {\n' +
        '            //img\n' +
        '            const img = new Image();\n' +
        '            img.src = url;\n' +
        '            img.alt = n;\n' +
        '\n' +
        '            img.onload = function () {\n' +
        '                prt.appendChild(img);\n' +
        '            }\n' +
        '        }\n' +
        '\n' +
        '        // 添加一张新的背景时，如果背景数量超过 2 张，就删除第一个背景\n' +
        '        if (prt.childElementCount > 2) {\n' +
        '            prt.removeChild(prt.childNodes[0]);\n' +
        '        }\n' +
        '    }\n' +
        '\n' +
        '    //判断是否联网\n' +
        '    if (window.navigator.onLine) {\n' +
        '        addImage();\n' +
        '        setInterval(addImage, 10000);\n' +
        '    } else {\n' +
        '        alert("未联网,无法显示背景");\n' +
        '    }\n' +
        '\n' +
        '</script>\n' +
        '\n' +
        '<!-- 漂浮和鼠标消失 -->\n' +
        '<!-- color：漂浮物颜色；opacity：透明度（0~1）；count：漂浮物数量；zindex：漂浮物所在层数 -->\n' +
        '<script\n' +
        '        color="255,165,0" opacity="1" count="250" zindex="2">\n' +
        '    !function () {\n' +
        '        let u = document.createElement("canvas");\n' +
        '        let s = l();\n' +
        '        let e = u.getContext("2d");\n' +
        '        let r;\n' +
        '        let n;\n' +
        '        let m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||\n' +
        '            function (i) {\n' +
        '                window.setTimeout(i, 1000 / 45)\n' +
        '            };\n' +
        '        let f = {\n' +
        '            x: null,\n' +
        '            y: null,\n' +
        '            max: 20000\n' +
        '        };\n' +
        '        let t = [];\n' +
        '        let p = 0;\n' +
        '\n' +
        '        function o(w, v, i) {\n' +
        '            return w.getAttribute(v) || i\n' +
        '        }\n' +
        '\n' +
        '        function j(i) {\n' +
        '            return document.getElementsByTagName(i)\n' +
        '        }\n' +
        '\n' +
        '        function l() {\n' +
        '            const i = j("script"),\n' +
        '                w = i.length,\n' +
        '                v = i[w - 1];\n' +
        '            return {\n' +
        '                l: w,\n' +
        '                z: o(v, "zIndex", -2),\n' +
        '                o: o(v, "opacity", 1),\n' +
        '                c: o(v, "color", "255,165,0"),\n' +
        '                n: o(v, "count", 300)\n' +
        '            }\n' +
        '        }\n' +
        '\n' +
        '        function k() {\n' +
        '            r = u.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,\n' +
        '                n = u.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight\n' +
        '        }\n' +
        '\n' +
        '        function b() {\n' +
        '            e.clearRect(0, 0, r, n);\n' +
        '            const w = [f].concat(t);\n' +
        '            let x, v, A, B, z, y;\n' +
        '            t.forEach(function (i) {\n' +
        '                i.x += i.xa,\n' +
        '                    i.y += i.ya,\n' +
        '                    i.xa *= i.x > r || i.x < 0 ? -1 : 1,\n' +
        '                    i.ya *= i.y > n || i.y < 0 ? -1 : 1,\n' +
        '                    e.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);\n' +
        '                for (v = 0; v < w.length; v++) {\n' +
        '                    x = w[v];\n' +
        '                    if (i !== x && null !== x.x && null !== x.y) {\n' +
        '                        B = i.x - x.x,\n' +
        '                            z = i.y - x.y,\n' +
        '                            y = B * B + z * z;\n' +
        '                        y < x.max && (x === f && y >= x.max / 2 && (i.x -= 0.03 * B, i.y -= 0.03 * z), A = (x.max - y) / x.max, e.beginPath(), e.lineWidth = A / 2, e.strokeStyle = "rgba(" + s.c + "," + (A + 0.2) + ")", e.moveTo(i.x, i.y), e.lineTo(x.x, x.y), e.stroke())\n' +
        '                    }\n' +
        '                }\n' +
        '                w.splice(w.indexOf(i), 1)\n' +
        '            }),\n' +
        '                m(b)\n' +
        '        }\n' +
        '\n' +
        '        let timer = null;\n' +
        '        let a = Math.random;\n' +
        '        u.id = "c_n" + s.l;\n' +
        '        u.style.cssText = "position:fixed;top:0;left:0;z-index:" + s.z + ";opacity:" + s.o;\n' +
        '        j("body")[0].appendChild(u);\n' +
        '\n' +
        '        //鼠标是否活动\n' +
        '        function mouseActive() {\n' +
        '            //显示鼠标指针\n' +
        '            document.body.style.cursor = "auto";\n' +
        '            // 重新设置计时器，在一段时间（这里是5秒钟）后移除坐标和鼠标\n' +
        '            timer = setTimeout(function () {\n' +
        '                //隐藏鼠标指针\n' +
        '                document.body.style.cursor = "none";\n' +
        '                f.x = null,\n' +
        '                    f.y = null;\n' +
        '            }, 5000);\n' +
        '        }\n' +
        '\n' +
        '        const a1 = document.querySelector(\'.a1\');\n' +
        '        k(),\n' +
        '            window.onresize = k;\n' +
        '        window.onmousemove = function (i) {\n' +
        '            i = i || window.event,\n' +
        '                f.x = i.clientX,\n' +
        '                f.y = i.clientY;\n' +
        '            // 获取元素在页面上的位置\n' +
        '            const rect = a1.getBoundingClientRect();\n' +
        '            const left = rect.left;\n' +
        '            const top = rect.top;\n' +
        '            const right = rect.right;\n' +
        '            const bottom = rect.bottom;\n' +
        '\n' +
        '            // 判断鼠标是否在元素区域内\n' +
        '            if (f.x >= left && f.x <= right && f.y >= top && f.y <= bottom) {\n' +
        '                a1.classList.remove(\'hide\'); // 显示元素\n' +
        '                a1.classList.add(\'show\'); // 添加类名 \'show\'，触发逐渐显示的动画\n' +
        '                clearTimeout(timer);\n' +
        '            } else {\n' +
        '                a1.classList.remove(\'show\'); // 移除类名 \'show\'\n' +
        '                a1.classList.add(\'hide\'); // 添加类名 \'hide\'，触发逐渐隐藏的动画\n' +
        '            }\n' +
        '            clearTimeout(timer);\n' +
        '            mouseActive();\n' +
        '        }\n' +
        '\n' +
        '        window.onmouseout = function () {\n' +
        '            f.x = null,\n' +
        '                f.y = null\n' +
        '        };\n' +
        '\n' +
        '        for (; s.n > p; p++) {\n' +
        '            const h = a() * r,\n' +
        '                g = a() * n,\n' +
        '                q = 2 * a() - 1,\n' +
        '                d = 2 * a() - 1;\n' +
        '            t.push({\n' +
        '                x: h,\n' +
        '                y: g,\n' +
        '                xa: q,\n' +
        '                ya: d,\n' +
        '                max: 6000\n' +
        '            })\n' +
        '\n' +
        '        }\n' +
        '        setTimeout(function () {\n' +
        '                b()\n' +
        '            },\n' +
        '            100)\n' +
        '    }();\n' +
        '\n' +
        '</script>\n' +
        '\n' +
        '<!-- 属性效果 -->\n' +
        '<script>\n' +
        '\n' +
        '    // 禁止右键菜单\n' +
        '    document.addEventListener(\'contextmenu\', function (event) {\n' +
        '        event.preventDefault();\n' +
        '    });\n' +
        '\n' +
        '    // 禁止文字选择\n' +
        '    document.addEventListener(\'selectstart\', function (event) {\n' +
        '        event.preventDefault();\n' +
        '    });\n' +
        '\n' +
        '    // 禁止复制\n' +
        '    document.addEventListener(\'copy\', function (event) {\n' +
        '        event.preventDefault();\n' +
        '    });\n' +
        '\n' +
        '    // 禁止剪切\n' +
        '    document.addEventListener(\'cut\', function (event) {\n' +
        '        event.preventDefault();\n' +
        '    });\n' +
        '\n' +
        '</script>\n' +
        '\n' +
        '</body>\n' +
        '</html>';

    return html;
}

button.addEventListener("click", function () {
    // 获取收藏夹数据
    chrome.bookmarks.getTree(function (bookmarkTreeNodes) {
        const favoritesHtml = generateHtmlFromBookmarks(bookmarkTreeNodes);

        // 创建下载链接
        const downloadLink = document.createElement('a');
        downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(favoritesHtml);
        downloadLink.download = '思源link.html';
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);

        // 模拟点击下载链接
        downloadLink.click();

        // 清理下载链接
        document.body.removeChild(downloadLink);
    });
});
