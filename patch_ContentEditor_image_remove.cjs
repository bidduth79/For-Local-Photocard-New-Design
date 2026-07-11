const fs = require('fs');
let content = fs.readFileSync('src/components/controls/news/ContentEditor.tsx', 'utf8');

const image1Find = `                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-4">`;

const image1Replace = `                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setImage('');
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors z-20"
                      title={language === 'bn' ? 'ছবি মুছুন' : 'Remove Image'}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 py-4">`;

content = content.replace(image1Find, image1Replace);

const image2Find = `                      </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-4">`;

const image2Replace = `                      </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          import('../../../store/appStore').then(m => m.useAppStore.getState().setImage2(''));
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors z-20"
                        title={language === 'bn' ? 'ছবি মুছুন' : 'Remove Image'}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 py-4">`;

content = content.replace(image2Find, image2Replace);

fs.writeFileSync('src/components/controls/news/ContentEditor.tsx', content);
