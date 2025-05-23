import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Clock, Bell, CheckCircle, AlertCircle, Database, Map, Settings, BarChart3 } from 'lucide-react';

const WorkInstructionApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [stepTimes, setStepTimes] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('PCB-001');
  const [activeView, setActiveView] = useState('instruction');
  const intervalRef = useRef(null);

  // Data produk elektronika
  const products = {
    'PCB-001': {
      name: 'PCB Assembly Module A',
      standardTime: 180, // dalam detik
      steps: [
        {
          id: 1,
          title: 'Persiapan Komponen',
          description: 'Siapkan komponen elektronika: resistor, kapasitor, IC',
          image: '🔧',
          standardTime: 30,
          components: ['Resistor 10kΩ', 'Kapasitor 100µF', 'IC ATmega328']
        },
        {
          id: 2,
          title: 'Pemasangan Resistor',
          description: 'Pasang resistor pada posisi R1, R2, R3 sesuai skema',
          image: '🔌',
          standardTime: 45,
          components: ['Resistor 10kΩ x3', 'Solder', 'Flux']
        },
        {
          id: 3,
          title: 'Pemasangan Kapasitor',
          description: 'Pasang kapasitor dengan memperhatikan polaritas',
          image: '⚡',
          standardTime: 35,
          components: ['Kapasitor 100µF', 'Kapasitor 22pF x2']
        },
        {
          id: 4,
          title: 'Pemasangan IC',
          description: 'Pasang IC pada socket dengan orientasi yang benar',
          image: '🖥️',
          standardTime: 40,
          components: ['IC ATmega328', 'Socket IC', 'Anti-static mat']
        },
        {
          id: 5,
          title: 'Testing & QC',
          description: 'Lakukan pengujian kontinuitas dan fungsional',
          image: '🔍',
          standardTime: 30,
          components: ['Multimeter', 'Oscilloscope', 'Test jig']
        }
      ]
    },
    'PCB-002': {
      name: 'Power Supply Unit',
      standardTime: 240,
      steps: [
        {
          id: 1,
          title: 'Persiapan Transformator',
          description: 'Siapkan dan test transformator input',
          image: '🔋',
          standardTime: 40,
          components: ['Transformator 220V-12V', 'Multimeter']
        },
        {
          id: 2,
          title: 'Pemasangan Dioda Bridge',
          description: 'Pasang dioda bridge untuk rectifier',
          image: '🔌',
          standardTime: 50,
          components: ['Dioda 1N4007 x4', 'Heatsink']
        },
        {
          id: 3,
          title: 'Filter Kapasitor',
          description: 'Pasang kapasitor filter dan regulator',
          image: '⚡',
          standardTime: 60,
          components: ['Kapasitor 2200µF', 'IC LM7812']
        },
        {
          id: 4,
          title: 'Final Testing',
          description: 'Test output voltage dan ripple',
          image: '🔍',
          standardTime: 90,
          components: ['Oscilloscope', 'Load tester']
        }
      ]
    }
  };

  // Data untuk dashboard
  const [productionData, setProductionData] = useState([
    { product: 'PCB-001', completed: 25, target: 30, efficiency: 83.3 },
    { product: 'PCB-002', completed: 18, target: 20, efficiency: 90.0 },
    { product: 'PCB-003', completed: 32, target: 35, efficiency: 91.4 }
  ]);

  // Jalur produksi
  const productionFlow = [
    { station: 'Incoming QC', time: '5 min', status: 'completed' },
    { station: 'Component Prep', time: '10 min', status: 'active' },
    { station: 'Assembly', time: '15 min', status: 'pending' },
    { station: 'Soldering', time: '20 min', status: 'pending' },
    { station: 'Testing', time: '8 min', status: 'pending' },
    { station: 'Final QC', time: '7 min', status: 'pending' },
    { station: 'Packaging', time: '5 min', status: 'pending' }
  ];

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  // Notifikasi reminder
  useEffect(() => {
    const currentProduct = products[selectedProduct];
    if (currentProduct && currentStep < currentProduct.steps.length) {
      const step = currentProduct.steps[currentStep];
      const stepElapsed = stepTimes[currentStep] || 0;
      
      if (stepElapsed > step.standardTime * 1.2) {
        addNotification(`Waktu step ${currentStep + 1} melebihi standar!`, 'warning');
      }
    }
  }, [stepTimes, currentStep, selectedProduct]);

  const addNotification = (message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
  };

  const startStep = () => {
    if (!isRunning) {
      setIsRunning(true);
      setStartTime(Date.now());
      setElapsedTime(0);
      addNotification(`Memulai step ${currentStep + 1}`, 'success');
    }
  };

  const pauseStep = () => {
    setIsRunning(false);
    addNotification(`Step ${currentStep + 1} dijeda`, 'info');
  };

  const finishStep = () => {
    if (isRunning) {
      setIsRunning(false);
      setStepTimes(prev => ({...prev, [currentStep]: elapsedTime}));
      
      const currentProduct = products[selectedProduct];
      const step = currentProduct.steps[currentStep];
      const isOnTime = elapsedTime <= step.standardTime;
      
      addNotification(
        `Step ${currentStep + 1} selesai dalam ${Math.floor(elapsedTime/60)}:${(elapsedTime%60).toString().padStart(2,'0')} ${isOnTime ? '✅' : '⚠️'}`, 
        isOnTime ? 'success' : 'warning'
      );
      
      if (currentStep < currentProduct.steps.length - 1) {
        setCurrentStep(prev => prev + 1);
        setElapsedTime(0);
      }
    }
  };

  const resetProcess = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setElapsedTime(0);
    setStepTimes({});
    addNotification('Proses direset', 'info');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const currentProduct = products[selectedProduct];

  const renderInstruction = () => (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{currentProduct.name}</h2>
            <p className="text-gray-600">Step {currentStep + 1} dari {currentProduct.steps.length}</p>
          </div>
          <select 
            value={selectedProduct} 
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="px-4 py-2 border rounded-lg"
          >
            {Object.entries(products).map(([key, product]) => (
              <option key={key} value={key}>{product.name}</option>
            ))}
          </select>
        </div>

        {/* Timer dan Controls */}
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-mono font-bold text-blue-600">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-sm text-gray-600">
              Target: {formatTime(currentProduct.steps[currentStep]?.standardTime || 0)}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={startStep}
              disabled={isRunning}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              <Play className="w-4 h-4 mr-2" /> Start
            </button>
            <button 
              onClick={pauseStep}
              disabled={!isRunning}
              className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50"
            >
              <Pause className="w-4 h-4 mr-2" /> Pause
            </button>
            <button 
              onClick={finishStep}
              disabled={!isRunning}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              <Square className="w-4 h-4 mr-2" /> Finish
            </button>
            <button 
              onClick={resetProcess}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Step Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Step */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">{currentProduct.steps[currentStep]?.image}</div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {currentProduct.steps[currentStep]?.title}
                </h3>
                <p className="text-gray-600">
                  {currentProduct.steps[currentStep]?.description}
                </p>
              </div>
            </div>

            {/* Komponen yang dibutuhkan */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">Komponen yang dibutuhkan:</h4>
              <ul className="list-disc list-inside text-blue-700">
                {currentProduct.steps[currentStep]?.components.map((component, idx) => (
                  <li key={idx}>{component}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold mb-4">Progress</h3>
            <div className="space-y-2">
              {currentProduct.steps.map((step, idx) => (
                <div key={idx} className={`flex items-center p-3 rounded-lg ${
                  idx === currentStep ? 'bg-blue-100 border-l-4 border-blue-500' :
                  idx < currentStep ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    {idx < currentStep ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : idx === currentStep ? (
                      <Clock className="w-5 h-5 text-blue-600" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-gray-300"></div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="font-medium">{step.title}</div>
                    <div className="text-sm text-gray-600">
                      Target: {formatTime(step.standardTime)}
                      {stepTimes[idx] && ` | Actual: ${formatTime(stepTimes[idx])}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 mr-2 text-orange-500" />
              <h3 className="font-bold">Notifikasi</h3>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map(notif => (
                <div key={notif.id} className={`p-3 rounded-lg text-sm ${
                  notif.type === 'success' ? 'bg-green-100 text-green-800' :
                  notif.type === 'warning' ? 'bg-orange-100 text-orange-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  <div className="font-medium">{notif.message}</div>
                  <div className="text-xs opacity-75">{notif.timestamp}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold mb-4">Statistik Hari Ini</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Produk Selesai</span>
                <span className="font-bold text-green-600">23</span>
              </div>
              <div className="flex justify-between">
                <span>Rata-rata Waktu</span>
                <span className="font-bold">3:45</span>
              </div>
              <div className="flex justify-between">
                <span>Efisiensi</span>
                <span className="font-bold text-blue-600">87%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFlow = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Denah Jalur Produksi</h2>
      
      <div className="relative">
        {/* Production Flow */}
        <div className="flex flex-wrap items-center justify-center space-x-4">
          {productionFlow.map((station, idx) => (
            <React.Fragment key={idx}>
              <div className={`flex flex-col items-center p-4 rounded-lg border-2 min-w-32 ${
                station.status === 'completed' ? 'border-green-500 bg-green-50' :
                station.status === 'active' ? 'border-blue-500 bg-blue-50' :
                'border-gray-300 bg-gray-50'
              }`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                  station.status === 'completed' ? 'bg-green-500' :
                  station.status === 'active' ? 'bg-blue-500' :
                  'bg-gray-400'
                }`}>
                  {station.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-white" />
                  ) : station.status === 'active' ? (
                    <Clock className="w-6 h-6 text-white" />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-white"></div>
                  )}
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm">{station.station}</div>
                  <div className="text-xs text-gray-600">{station.time}</div>
                </div>
              </div>
              
              {idx < productionFlow.length - 1 && (
                <div className="flex-shrink-0">
                  <div className="w-8 h-0.5 bg-gray-400"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Layout Diagram */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-bold mb-4">Layout Pabrik</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="bg-blue-200 p-4 rounded">Incoming</div>
            <div className="bg-yellow-200 p-4 rounded">Prep Area</div>
            <div className="bg-orange-200 p-4 rounded">Assembly</div>
            <div className="bg-red-200 p-4 rounded">Soldering</div>
            <div className="bg-purple-200 p-4 rounded">Testing</div>
            <div className="bg-green-200 p-4 rounded">QC</div>
            <div className="bg-pink-200 p-4 rounded">Packaging</div>
            <div className="bg-gray-200 p-4 rounded">Shipping</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Produksi</h2>
      
      {/* Production Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productionData.map((item, idx) => (
          <div key={idx} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="font-bold text-lg mb-2">{item.product}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Completed:</span>
                <span className="font-bold text-green-600">{item.completed}</span>
              </div>
              <div className="flex justify-between">
                <span>Target:</span>
                <span className="font-bold">{item.target}</span>
              </div>
              <div className="flex justify-between">
                <span>Efficiency:</span>
                <span className={`font-bold ${item.efficiency >= 90 ? 'text-green-600' : 'text-orange-600'}`}>
                  {item.efficiency}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{width: `${(item.completed/item.target)*100}%`}}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Integration Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-bold text-lg mb-4">Database Integration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Google Sheets Connection</h4>
            <p className="text-sm text-gray-600 mb-2">Status: ✅ Connected</p>
            <p className="text-sm text-gray-600">Data disinkronisasi setiap 5 menit</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Real-time Data</h4>
            <p className="text-sm text-gray-600 mb-2">Last Update: {new Date().toLocaleTimeString()}</p>
            <p className="text-sm text-gray-600">Auto-backup ke cloud storage</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-800">Work Instruction System</h1>
            <div className="flex space-x-4">
              <button 
                onClick={() => setActiveView('instruction')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeView === 'instruction' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                <Settings className="w-4 h-4 mr-2" />
                Instruksi Kerja
              </button>
              <button 
                onClick={() => setActiveView('flow')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeView === 'flow' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                <Map className="w-4 h-4 mr-2" />
                Denah Jalur
              </button>
              <button 
                onClick={() => setActiveView('dashboard')}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  activeView === 'dashboard' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeView === 'instruction' && renderInstruction()}
        {activeView === 'flow' && renderFlow()}
        {activeView === 'dashboard' && renderDashboard()}
      </main>
    </div>
  );
};

export default WorkInstructionApp;