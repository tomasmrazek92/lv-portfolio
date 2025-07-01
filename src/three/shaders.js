export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform vec2 uOffset;
  uniform vec2 uResolution;
  uniform vec4 uBorderColor;
  uniform vec4 uHoverColor;
  uniform vec4 uBackgroundColor;
  uniform vec2 uMousePos;
  uniform float uZoom;
  uniform float uCellSize;
  uniform float uTextureCount;
  uniform float uAtlasWidth;
  uniform float uAtlasHeight;
  uniform sampler2D uImageAtlas;
  uniform sampler2D uTextAtlas;
  uniform vec2 uHoveredCell;
  uniform float uHoverIntensity;
  varying vec2 vUv;
  
  void main() {
    vec2 screenUV = (vUv - 0.5) * 2.0;
    
    float radius = length(screenUV);
    float distortion = 1.0 - 0.08 * radius * radius;
    vec2 distortedUV = screenUV * distortion;
    
    vec2 aspectRatio = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 worldCoord = distortedUV * aspectRatio;
    
    worldCoord *= uZoom;
    worldCoord += uOffset;
    
    vec2 cellPos = worldCoord / uCellSize;
    
    cellPos.x = cellPos.x * 0.95;
    cellPos.y = cellPos.y * 0.95;
    
    vec2 cellId = floor(cellPos);
    vec2 cellUV = fract(cellPos);
    
    bool isHovered = (cellId.x == uHoveredCell.x && cellId.y == uHoveredCell.y && uHoverIntensity > 0.01);
    
    float cellIndex = cellId.x + cellId.y * 3.0;
    float texIndex = mod(cellIndex, uTextureCount);
    
    vec3 color = vec3(0.0);
    float alpha = 0.0;
    
    float textHeight = 0.32;
    float textMargin = 0.05;
    float imageMargin = 0.05;
    
    float actualTextMargin = textMargin;
    float actualTextHeight = textHeight;
    float actualImageMargin = imageMargin;
    float actualImageHeight;
    
    if (isHovered) {
      float scaleReduction = uHoverIntensity * 0.02;
      actualImageMargin = imageMargin + scaleReduction;
    }
    
    bool inTextArea = cellUV.x >= actualTextMargin && cellUV.x <= (1.0 - actualTextMargin) && 
                      cellUV.y >= actualTextMargin && cellUV.y <= actualTextHeight;
    
    if (inTextArea) {
      vec2 textCoord = vec2(
        (cellUV.x - actualTextMargin) / (1.0 - 2.0 * actualTextMargin),
        (cellUV.y - actualTextMargin) / (actualTextHeight - actualTextMargin)
      );
      
      float atlasX = mod(texIndex, uAtlasWidth);
      float atlasY = floor(texIndex / uAtlasWidth);
      vec2 atlasUV = (vec2(atlasX, atlasY) + textCoord) / vec2(uAtlasWidth, uAtlasHeight);
      atlasUV.y = 1.0 - atlasUV.y;
      
      vec4 textColor = texture2D(uTextAtlas, atlasUV);
      
      if (textColor.a > 0.3) {
        color = textColor.rgb;
        alpha = smoothstep(0.2, 0.7, textColor.a);
        
        if (isHovered) {
          color = mix(color, uHoverColor.rgb, uHoverIntensity * uHoverColor.a * 0.2);
        }
      }
    }
    
    float imageY = textHeight + 0.02;
    actualImageHeight = 1.0 - imageY - actualImageMargin;
    
    bool inImageArea = cellUV.x >= actualImageMargin && cellUV.x <= (1.0 - actualImageMargin) && 
                       cellUV.y >= imageY && cellUV.y <= (imageY + actualImageHeight);
    
    if (inImageArea) {
      vec2 imageUV = vec2(
        (cellUV.x - actualImageMargin) / (1.0 - 2.0 * actualImageMargin),
        (cellUV.y - imageY) / actualImageHeight
      );
      
      float atlasX = mod(texIndex, uAtlasWidth);
      float atlasY = floor(texIndex / uAtlasWidth);
      vec2 atlasUV = (vec2(atlasX, atlasY) + imageUV) / vec2(uAtlasWidth, uAtlasHeight);
      atlasUV.y = 1.0 - atlasUV.y;
      
      vec4 imageColor = texture2D(uImageAtlas, atlasUV);
      color = imageColor.rgb;
      alpha = 1.0;
      
      if (isHovered) {
        color = mix(color, uHoverColor.rgb, uHoverIntensity * uHoverColor.a * 0.3);
      }
    }
        
    float fade = 1.0 - smoothstep(1.2, 1.8, radius);
    alpha *= fade;
    
    gl_FragColor = vec4(color, alpha);
  }
`;
