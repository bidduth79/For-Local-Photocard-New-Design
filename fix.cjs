const fs = require('fs');
const path = require('path');

const dir = 'src/components/cards/designs';
const files = fs.readdirSync(dir).filter(f => f.startsWith('Design') && f.endsWith('.tsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove showDetailedNewsBox from footers
  if (file === 'Design1.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="w-full pb-12 px-12/g, '<div className="w-full pb-12 px-12');
    content = content.replace(/<\/QRCodeSVG>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/g, '</QRCodeSVG>\n             </div>\n          </div>');
  } else if (file === 'Design2.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="absolute bottom-0/g, '<div className="absolute bottom-0');
    content = content.replace(/<\/QRCodeSVG>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/g, '</QRCodeSVG>\n            </div>\n          </div>');
  } else if (file === 'Design3.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="absolute bottom-0 left-0 right-0 p-8/g, '<div className="absolute bottom-0 left-0 right-0 p-8');
    content = content.replace(/<\/QRCodeSVG>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/g, '</QRCodeSVG>\n               </div>\n             </div>');
  } else if (file === 'Design4.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="mt-8 pt-6 border-t/g, '<div className="mt-8 pt-6 border-t');
    content = content.replace(/<\/QRCodeSVG>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/g, '</QRCodeSVG>\n                </div>\n              </div>');
  } else if (file === 'Design5.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="mt-8 pt-6 border-t/g, '<div className="mt-8 pt-6 border-t');
    content = content.replace(/<\/QRCodeSVG>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/g, '</QRCodeSVG>\n                 </div>\n               </div>');
  } else if (file === 'Design6.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="absolute bottom-0 left-0 right-0 p-8/g, '<div className="absolute bottom-0 left-0 right-0 p-8');
    content = content.replace(/<\/QRCodeSVG>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/g, '</QRCodeSVG>\n               </div>\n             </div>');
  } else if (file === 'Design7.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="mt-8 pt-6 border-t/g, '<div className="mt-8 pt-6 border-t');
    content = content.replace(/<\/QRCodeSVG>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/g, '</QRCodeSVG>\n                </div>\n              </div>');
  } else if (file === 'Design8.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="mt-8 pt-6 border-t/g, '<div className="mt-8 pt-6 border-t');
    content = content.replace(/<\/QRCodeSVG>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/g, '</QRCodeSVG>\n                 </div>\n               </div>');
  } else if (file === 'Design9.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="absolute bottom-0 left-0 right-0 p-8/g, '<div className="absolute bottom-0 left-0 right-0 p-8');
    content = content.replace(/<\/QRCodeSVG>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}/g, '</QRCodeSVG>\n               </div>\n             </div>');
  } else if (file === 'Design10.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="flex flex-col gap-4 mt-8">/g, '<div className="flex flex-col gap-4 mt-8">');
    content = content.replace(/<\/div>\n\s*\)\}\n\s*<\/div>\n\s*<\/div>\n\s*\)\}\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*\);\n\};/g, '</div>\n                  )}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n};');
    // For description
    content = content.replace(/<div className="bg-black\/20 backdrop-blur-sm p-8 border-l-4"/g, '{showDetailedNewsBox && (\n            <div className="bg-black/20 backdrop-blur-sm p-8 border-l-4"');
    content = content.replace(/<\/p>\n\s*<\/div>\n\s*<\/div>\n\n\s*\{\/\* Footer \*\/\}/g, '</p>\n            </div>\n          )}\n        </div>\n\n        {/* Footer */}');
  } else if (file === 'Design11.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="flex items-end justify-between pt-8 border-t/g, '<div className="flex items-end justify-between pt-8 border-t');
    content = content.replace(/<\/div>\n\s*\)\}\n\s*<\/div>\n\s*\)\}\n\s*<\/div>\n\n\s*\{\/\* Side Decorative Bar \*\/\}/g, '</div>\n                )}\n              </div>\n            </div>\n          </div>\n\n      {/* Side Decorative Bar */}');
    // For description
    content = content.replace(/<div className="relative">\n\s*<div \n\s*className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"/g, '{showDetailedNewsBox && (\n            <div className="relative">\n              <div \n                className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"');
    content = content.replace(/<\/p>\n\s*<\/div>\n\s*<\/div>\n\n\s*\{\/\* Footer Section \*\/\}/g, '</p>\n            </div>\n          )}\n        </div>\n\n        {/* Footer Section */}');
  } else if (file === 'Design12.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="absolute bottom-12 left-16/g, '<div className="absolute bottom-12 left-16');
    content = content.replace(/<\/span>\n\s*<\/div>\n\s*\)\}/g, '</span>\n        </div>');
    content = content.replace(/\{showSocialIcons && showDetailedNewsBox && \(/g, '{showSocialIcons && (');
    // For description
    content = content.replace(/<div className="max-w-\[85%\] mx-auto">/g, '{showDetailedNewsBox && (\n          <div className="max-w-[85%] mx-auto">');
    content = content.replace(/<\/p>\n\s*<\/div>\n\s*<\/div>\n\n\s*\{\/\* Footer Left/g, '</p>\n          </div>\n        )}\n      </div>\n\n      {/* Footer Left');
  } else if (file === 'Design13.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="absolute bottom-12 left-12/g, '<div className="absolute bottom-12 left-12');
    content = content.replace(/<\/span>\n\s*<\/div>\n\s*\)\}/g, '</span>\n        </div>');
    content = content.replace(/\{showSocialIcons && showDetailedNewsBox && \(/g, '{showSocialIcons && (');
    // For description
    content = content.replace(/<p \n\s*className="leading-relaxed font-medium drop-shadow-md max-w-3xl mx-auto"/g, '{showDetailedNewsBox && (\n          <p \n            className="leading-relaxed font-medium drop-shadow-md max-w-3xl mx-auto"');
    content = content.replace(/<\/p>\n\s*<\/div>\n\s*<\/div>\n\s*\);\n\};/g, '</p>\n        )}\n      </div>\n    </div>\n  );\n};');
  } else if (file === 'Design14.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div \n\s*className="absolute bottom-0 left-6 right-0/g, '<div \n            className="absolute bottom-0 left-6 right-0');
    content = content.replace(/<\/div>\n\s*\)\}\n\s*<\/div>\n\s*\)\}\n\s*<\/div>\n\s*<\/div>\n\s*\);\n\};/g, '</div>\n                )}\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n};');
    // For description
    content = content.replace(/<p \n\s*className="leading-\[1\.4\] font-medium text-gray-700 relative z-40"/g, '{showDetailedNewsBox && (\n            <p \n              className="leading-[1.4] font-medium text-gray-700 relative z-40"');
    content = content.replace(/<\/p>\n\s*<\/div>\n\n\s*\{\/\* Footer Area \*\/\}/g, '</p>\n          )}\n        </div>\n\n        {/* Footer Area */}');
  } else if (file === 'Design15.tsx') {
    content = content.replace(/\{showDetailedNewsBox && \(\n\s*<div className="absolute bottom-12 left-12 right-12/g, '<div className="absolute bottom-12 left-12 right-12');
    content = content.replace(/<\/div>\n\s*\)\}\n\s*<\/div>\n\s*\)\}\n\s*<\/div>\n\s*\);\n\};/g, '</div>\n                )}\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n};');
    // For description
    content = content.replace(/<div className="relative z-20 mt-6">/g, '{showDetailedNewsBox && (\n            <div className="relative z-20 mt-6">');
    content = content.replace(/<\/p>\n\s*<\/div>\n\s*<\/div>\n\n\s*\{\/\* Footer \*\/\}/g, '</p>\n            </div>\n          )}\n        </div>\n\n        {/* Footer */}');
  }

  fs.writeFileSync(filePath, content);
});
