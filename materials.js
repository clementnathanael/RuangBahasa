function loadMaterial(materialId) {
    const contentId = `content${materialId.charAt(materialId.length - 1)}`;
    const material = document.getElementById(materialId).value;
    const contentDiv = document.getElementById(contentId);

    let content = '';
    switch (material) {
        case 'material1-1':
            content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.';
            break;
        case 'material1-2':
            content = 'Content for Material 1-2';
            break;
        case 'material1-3':
            content = 'Content for Material 1-3';
            break;
        case 'material2-1':
            content = 'Content for Material 2-1';
            break;
        case 'material2-2':
            content = 'Content for Material 2-2';
            break;
        case 'material2-3':
            content = 'Content for Material 2-3';
            break;
        case 'material3-1':
            content = 'Content for Material 3-1';
            break;
        case 'material3-2':
            content = 'Content for Material 3-2';
            break;
        case 'material3-3':
            content = 'Content for Material 3-3';
            break;
        default:
            content = '';
    }

    contentDiv.innerHTML = content;
}