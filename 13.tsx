import React, { useState, useMemo } from 'react';
import {
  Building2,
  Phone,
  Clock,
  AlertCircle,
  CheckCircle2,
  Clock3,
  HelpCircle,
  MessageSquare,
  Vote,
  Search,
  ChevronDown,
  ChevronRight,
  Send,
  FileText,
  ShieldAlert,
  Car,
  Trash2,
  Wrench,
  Sparkles,
  Info,
  Calendar,
  X,
  Menu,
  Check,
  Megaphone,
  Filter,
  Camera,
  MapPin,
  ExternalLink,
  ThumbsUp,
  UserCheck,
  Mail,
  Navigation,
  Download,
  Share2,
  CheckCircle,
  FileSpreadsheet,
  Printer,
  BellRing,
  Bookmark
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Quick Toast Trigger Helper (Replacing native alerts)
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const [notificationBanner] = useState(
    '1301동~1315동 승강기 정기 안전점검이 11월 4일(수) 오전 10시부터 순차 진행됩니다.'
  );

  // --- Complaints / Requests State ---
  const [complaintFilter, setComplaintFilter] = useState('전체');
  const [complaintSearch, setComplaintSearch] = useState('');
  const [complaints, setComplaints] = useState([
    {
      id: 'COMP-2026-104',
      dong: '1308',
      ho: '702',
      category: '소음/주차',
      title: '지하주차장 B2 진입로 이중주차 규제봉 점검 요청',
      author: '김*현',
      date: '2026-10-31',
      status: '처리중',
      department: '관리보안과',
      content: '출근 시간대 지하주차장 B2 코너 부근에 불법 주차가 잦아 시야가 가립니다. 탄력봉 추가 설치를 검토해주세요.',
      reply: '현장 확인 완료하였으며, 통행 방해 방지용 탄력 규제봉 2개 추가 설치를 11월 2일 진행할 예정입니다.',
      isSecret: false,
    },
    {
      id: 'COMP-2026-103',
      dong: '1312',
      ho: '1204',
      category: '시설보수',
      title: '단지 내 어린이놀이터(2호) 그네 완충고무 교체 건',
      author: '이*정',
      date: '2026-10-29',
      status: '처리완료',
      department: '기전보수과',
      content: '어린이놀이터 2호 그네 좌측 체인 하단 고무 패드가 마모되어 쇠소리가 납니다. 안전점검 부탁드립니다.',
      reply: '10월 30일 오후 마모된 체인 커버 및 고무 완충재 신품으로 교체 작업 완료하였습니다.',
      isSecret: false,
    },
    {
      id: 'COMP-2026-102',
      dong: '1303',
      ho: '301',
      category: '보안/위생',
      title: '1303동 뒤편 보행로 가로등 야간 점등 불량',
      author: '박*호',
      date: '2026-10-28',
      status: '처리완료',
      department: '전기과',
      content: '야간 20시 이후 보행로 중간 LED 등이 깜빡거리다가 소등됩니다. 야간 보행에 위험합니다.',
      reply: '안정기 불량으로 확인되어 고효율 방수형 LED 모듈 및 안정기 일체 교체 수리 완료했습니다.',
      isSecret: false,
    },
    {
      id: 'COMP-2026-101',
      dong: '1320',
      ho: '905',
      category: '시설보수',
      title: '옥상 배수관 낙엽 청소 및 배수 상태 점검 요망',
      author: '최*우',
      date: '2026-10-27',
      status: '접수완료',
      department: '시설관리팀',
      content: '가을철 낙엽이 많이 떨어져 옥상 배수구가 막힐 우려가 있습니다. 동절기 대비 사전 청소 부탁드립니다.',
      reply: '가을철 단지 전체 옥상 트렌치 배수관 청소 일정이 11월 둘째 주에 예정되어 있으며 조속히 정비하겠습니다.',
      isSecret: false,
    }
  ]);

  // Modal State for viewing complaint
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // New Complaint Form State
  const [complaintForm, setComplaintForm] = useState({
    dong: '',
    ho: '',
    name: '',
    phone: '',
    category: '시설보수',
    title: '',
    content: '',
    isSecret: false,
  });

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    if (!complaintForm.dong || !complaintForm.ho || !complaintForm.title || !complaintForm.content) {
      showToast('동/호수 및 필수 항목을 모두 입력해주세요.', 'error');
      return;
    }

    const newEntry = {
      id: `COMP-2026-${Math.floor(100 + Math.random() * 900)}`,
      dong: complaintForm.dong,
      ho: complaintForm.ho,
      category: complaintForm.category,
      title: complaintForm.title,
      author: complaintForm.name ? `${complaintForm.name[0]}*${complaintForm.name.slice(2) || '민'}` : '입주민',
      date: new Date().toISOString().split('T')[0],
      status: '접수완료',
      department: '기전/관리팀 배정중',
      content: complaintForm.content,
      reply: '접수가 정상 완료되었습니다. 담당 기전·관리팀에서 확인 후 현장 점검 계획을 남겨드리겠습니다.',
      isSecret: complaintForm.isSecret,
    };

    setComplaints([newEntry, ...complaints]);
    showToast(`민원이 성공적으로 접수되었습니다. (접수번호: ${newEntry.id})`, 'success');
    setComplaintForm({
      dong: '',
      ho: '',
      name: '',
      phone: '',
      category: '시설보수',
      title: '',
      content: '',
      isSecret: false,
    });
  };

  // Filtered complaints
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      const matchFilter = complaintFilter === '전체' || c.status === complaintFilter;
      const matchSearch =
        c.title.toLowerCase().includes(complaintSearch.toLowerCase()) ||
        c.content.toLowerCase().includes(complaintSearch.toLowerCase()) ||
        c.dong.includes(complaintSearch) ||
        c.ho.includes(complaintSearch) ||
        c.id.toLowerCase().includes(complaintSearch.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [complaints, complaintFilter, complaintSearch]);

  // Form Download List (Resident Service)
  const formsData = [
    { name: '세대 인테리어 공사 신청서 및 입주민 동의서 서식', size: '142 KB', format: 'HWP/PDF' },
    { name: '승강기(엘리베이터) 사용 신청 및 예치금 납부서', size: '98 KB', format: 'PDF' },
    { name: '입주민 차량 등록 및 정기주차 스티커 신청서', size: '85 KB', format: 'PDF' },
    { name: '입주자대표회의 안건 제안서 및 주민 위임장', size: '110 KB', format: 'HWP/DOC' }
  ];

  const handleDownloadForm = (formName) => {
    showToast(`[${formName}] 다운로드가 시작되었습니다.`, 'success');
  };

  // --- FAQ State ---
  const [faqCategory, setFaqCategory] = useState('전체');
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqData = [
    {
      id: 1,
      category: '인테리어/이사',
      question: '세대 내 인테리어 공사 시 사전 신고 절차 및 공사 예치금 기준은?',
      answer: '공사 시작 최소 7일 전 관리사무소에 방문하여 [공사신고서] 및 [해당 동 입주민 과반수 동의서(인접 4개 층 필수)]를 제출하셔야 합니다. 소음 유발 공사(철거/마루/욕실 등)는 평일 09:00~17:00에만 가능하며(주말·공휴일 불가), 공사 예치금(30만원~50만원 규정)과 승강기 사용료가 부과됩니다.',
      tag: '인테리어'
    },
    {
      id: 2,
      category: '주차/차량',
      question: '신규 입주민 차량 등록 및 방문 차량 예약 방법은?',
      answer: '입주민 정기 주차 등록은 차량등록증 및 주민등록등본을 지참하여 관리사무소 방문 등록 또는 관리앱(아파트너)을 통해 신청 가능합니다. 1세대 1차량은 무료이며, 2차량부터는 단지 주차관리 규정에 따른 차등 주차관리비가 적용됩니다. 방문 차량은 경비실 또는 관리사무소 웹/앱을 통해 사전 모바일 등록이 가능합니다.',
      tag: '차량등록'
    },
    {
      id: 3,
      category: '재활용/쓰레기',
      question: '재활용 쓰레기 분리배출 요일 및 시간, 대형폐기물 스티커 구매는 어떻게 하나요?',
      answer: '목동13단지의 재활용 분리수거는 매주 수요일 07:00부터 목요일 오전 06:00까지 배출 가능합니다. 수거차량 진입 및 쾌적한 단지 환경정리를 위해 목요일 오전 6시 정각에 각 동 수거함이 마감·철거되오니 배출 시간을 반드시 준수해 주시기 바랍니다. 대형 폐기물(가구, 가전 등)은 양천구청 청소행정과 홈페이지 모바일 배출신고 후 발급 번호를 부착하여 지정 장소에 배출해 주시면 됩니다.',
      tag: '분리수거'
    },
    {
      id: 4,
      category: '관리비/정산',
      question: '이사(전출/전입) 시 관리비 중간정산 절차는 어떻게 되나요?',
      answer: '이사 당일 수도, 전기, 가스 계량기 수치를 확인하신 후 관리사무소 경리과(02-2648-4322)로 연락 주시면 이사 당일까지의 관리비 정산서를 즉시 발급해 드립니다. 장기수선충당금 납부확인서 또한 관리사무소에서 원스톱 발급되어 소유자(임대인) 정산 시 활용하실 수 있습니다.',
      tag: '관리비정산'
    },
    {
      id: 5,
      category: '시설/승강기',
      question: '사다리차 이용 또는 승강기 이사 시 사용료 및 예약 방법은?',
      answer: '이사 일정 확정 시 최소 3일 전 관리사무소에 사다리차 사용 공간 확보 또는 승강기 전용 사용 예약을 진행하셔야 합니다. 사다리차 거치 시 보행자 안전통로 확보가 필수이며, 승강기 이용 시 규정된 승강기 사용료 납부 후 보양재 설치 상태를 확인받으셔야 합니다.',
      tag: '승강기이용'
    },
    {
      id: 6,
      category: '소음/생활',
      question: '층간소음 분쟁 시 관리사무소나 단지 내 위원회 중재 절차가 있나요?',
      answer: '목동13단지는 [단지 층간소음관리위원회]를 자치 운영하고 있습니다. 소음 발생 시 직접 대면 항의를 지양하시고, 관리사무소 민원실로 1차 접수해주시면 전문 직원이 현장 소음 모니터링 및 상호 원만한 대화 중재를 지원해드립니다.',
      tag: '층간소음'
    }
  ];

  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchCategory = faqCategory === '전체' || item.category === faqCategory;
      const matchSearch =
        item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
        item.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
        item.tag.toLowerCase().includes(faqSearch.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [faqCategory, faqSearch]);

  // --- Smart Indigo / Cyan Themed Polls State ---
  const [polls, setPolls] = useState([
    {
      id: 'POLL-01',
      title: '2026 가을 단지 내 수목 전지작업 및 화단 정비 계획 주민의견 수렴',
      desc: '1301동~1330동 저층 세대 일조권 확보와 보행로 안전을 위한 조경수 전지작업 및 중앙광장 화단 국화 식재 계획안에 대한 입주민 여러분의 소중한 의견을 듣습니다.',
      endDate: '2026-11-15',
      badge: '진행중',
      totalVotes: 342,
      userVoted: null,
      options: [
        { id: 'opt1', text: '찬성 (저층 일조권 개선 및 전지 필수 추진)', votes: 268 },
        { id: 'opt2', text: '수정 추진 (보행로 위주 최소 전지)', votes: 54 },
        { id: 'opt3', text: '반대 (현재 울창한 숲 형태 유지 희망)', votes: 20 },
      ],
      comments: [
        { author: '1305동 주민', text: '저층 베란다 나뭇가지가 많이 무성해서 태양광이 안 들어왔는데 꼭 진행되었으면 합니다.', date: '10-30' },
        { author: '1314동 주민', text: '전지 작업 시 단지 내 주차 차량 낙하물 피해 없도록 사전 예고 철저히 부탁드립니다.', date: '10-29' }
      ]
    },
    {
      id: 'POLL-02',
      title: '지하주차장 스마트 고효율 센서형 LED 전면 교체(절전 사업) 건',
      desc: '공용 관리비 절감(연간 약 2,100만원 전력비 절감 예상) 및 조도 개선을 위한 지하 1, 2층 주차장 스마트 LED 등기구 교체 공사 찬반 투표입니다.',
      endDate: '2026-11-10',
      badge: '진행중',
      totalVotes: 512,
      userVoted: 'opt1',
      options: [
        { id: 'opt1', text: '적극 찬성 (관리비 절감 및 시인성 개선)', votes: 472 },
        { id: 'opt2', text: '반대 / 현행 유지', votes: 40 },
      ],
      comments: [
        { author: '1322동 주민', text: '지하주차장이 어두운 구역이 많았는데 센서형 LED로 교체하면 훨씬 밝고 안전해지겠네요.', date: '10-28' },
        { author: '1309동 주민', text: '시공 업체 선정 시 AS 보증기간을 최소 3년 이상 확보해 주시길 당부드립니다.', date: '10-29' }
      ]
    }
  ]);

  const [newCommentInput, setNewCommentInput] = useState({});

  const handleVote = (pollId, optionId) => {
    const target = polls.find(p => p.id === pollId);
    if (target && target.userVoted) {
      showToast('이미 투표에 참여하셨습니다. (1세대 1회 참여 가능)', 'info');
      return;
    }

    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;
        return {
          ...poll,
          userVoted: optionId,
          totalVotes: poll.totalVotes + 1,
          options: poll.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          ),
        };
      })
    );
    showToast('소중한 입주민 투표가 성공적으로 집계되었습니다.', 'success');
  };

  const handleAddComment = (pollId) => {
    const text = newCommentInput[pollId];
    if (!text || !text.trim()) {
      showToast('의견 내용을 입력해주세요.', 'info');
      return;
    }

    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;
        return {
          ...poll,
          comments: [
            {
              author: '목동13단지 입주민',
              text: text.trim(),
              date: '방금 전'
            },
            ...poll.comments
          ]
        };
      })
    );
    setNewCommentInput((prev) => ({ ...prev, [pollId]: '' }));
    showToast('주민 의견이 등록되었습니다.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Toast Notification Bar */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 max-w-sm animate-bounce-short">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl border text-sm font-semibold flex items-center gap-3 backdrop-blur-md ${
              toastMessage.type === 'error'
                ? 'bg-rose-900/90 text-white border-rose-700'
                : toastMessage.type === 'success'
                ? 'bg-teal-900/90 text-white border-teal-600'
                : 'bg-slate-900/90 text-white border-slate-700'
            }`}
          >
            {toastMessage.type === 'success' && <CheckCircle className="w-5 h-5 text-teal-300 shrink-0" />}
            {toastMessage.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-300 shrink-0" />}
            {toastMessage.type === 'info' && <Info className="w-5 h-5 text-indigo-300 shrink-0" />}
            <span>{toastMessage.message}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-auto text-slate-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs border-b border-slate-800 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            <span className="inline-flex items-center gap-1 text-teal-400 font-medium">
              <MapPin className="w-3.5 h-3.5" /> 서울특별시 양천구 목동동로 100 (목동신시가지 13단지)
            </span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div className="flex items-center gap-1.5">
              <a
                href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%96%91%EC%82%B0%EA%B5%AC%20%EB%AA%A9%EB%8F%99%EB%8F%99%EB%A1%9C%20100"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-300 hover:text-white hover:bg-emerald-800 transition text-[11px] font-medium border border-emerald-700/50 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span> 네이버지도
              </a>
              <a
                href="https://map.kakao.com/link/search/서울특별시 양천구 목동동로 100"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-yellow-950 text-yellow-300 hover:text-white hover:bg-yellow-800 transition text-[11px] font-medium border border-yellow-700/50 shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span> 카카오맵
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <a href="mailto:yungh07@naver.com" className="hover:text-teal-400 transition flex items-center gap-1 text-slate-300">
              <Mail className="w-3 h-3 text-teal-400" /> yungh07@naver.com
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a href="tel:0226484321" className="hover:text-teal-400 transition flex items-center gap-1 font-semibold text-slate-200">
              <Phone className="w-3 h-3 text-teal-400" /> 02-2648-4321
            </a>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-amber-400 font-semibold">
              <ShieldAlert className="w-3 h-3" /> 당직실: 02-2648-4325
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo & Identity */}
            <div
              onClick={() => setCurrentTab('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <Building2 className="w-6 h-6 text-teal-300" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-teal-700 transition">
                    목동신시가지 13단지
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                    관리사무소
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  Mokdong Complex 13 Smart Resident Portal
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {[
                { id: 'home', label: '단지 홈' },
                { id: 'complaints', label: '불편사항 및 민원접수' },
                { id: 'faq', label: '입주민 Q&A (FAQ)' },
                { id: 'polls', label: '주민의견·투표' },
                { id: 'info', label: '단지·관리비 안내' },
              ].map((tab) => {
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 relative ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                    {tab.id === 'polls' && (
                      <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-indigo-500 text-white font-bold">
                        투표중
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Action Button & Mobile Hamburger */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentTab('complaints')}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm transition active:scale-95"
              >
                <Wrench className="w-4 h-4" />
                빠른 민원접수
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition"
                aria-label="메뉴 열기"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
            {[
              { id: 'home', label: '단지 홈' },
              { id: 'complaints', label: '불편사항 및 민원접수' },
              { id: 'faq', label: '입주민 Q&A (자주 묻는 질문)' },
              { id: 'polls', label: '주민의견수렴 및 투표' },
              { id: 'info', label: '단지 시설 및 생활규정 안내' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between ${
                  currentTab === tab.id
                    ? 'bg-teal-50 text-teal-800 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{tab.label}</span>
                  {tab.id === 'polls' && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-indigo-100 text-indigo-700 font-bold rounded">
                      진행중
                    </span>
                  )}
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentTab('complaints');
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-600 text-white font-medium shadow-sm"
              >
                <Wrench className="w-4 h-4" /> 실시간 불편·보수 접수하기
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Ticker / Announcement Ribbon */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 text-white py-2.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 overflow-hidden cursor-pointer" onClick={() => setNoticeModalOpen(true)}>
            <span className="shrink-0 flex items-center gap-1 font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40">
              <Megaphone className="w-3.5 h-3.5" /> 단지 공지
            </span>
            <p className="truncate text-slate-200 hover:underline">
              {notificationBanner}
            </p>
          </div>
          <button
            onClick={() => setNoticeModalOpen(true)}
            className="hidden md:inline-flex items-center gap-1 shrink-0 text-cyan-300 text-xs hover:underline"
          >
            상세보기 <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {noticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-start pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-800 text-xs font-bold">공지안내</span>
                <h3 className="font-bold text-slate-900 text-base">승강기 정기 안전점검 실시 안내</h3>
              </div>
              <button
                onClick={() => setNoticeModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
              <p>
                <strong>1. 점검 일시 :</strong> 2026년 11월 4일(수) 10:00 ~ 16:00
              </p>
              <p>
                <strong>2. 점검 대상 :</strong> 1301동 ~ 1315동 전 승강기 (동별 약 40분씩 일시정지)
              </p>
              <p>
                <strong>3. 점검 내용 :</strong> 승강기안전공단 주관 연례 법정 정기검사, 제동기 및 로프 마모도 측정, 비상통화장치 동작 시험
              </p>
              <p className="p-3 bg-amber-50 text-amber-900 rounded-xl border border-amber-200 text-xs">
                ※ 검사 중에는 승강기 탑승이 불가하오니 계단을 이용해 주시기 바라며, 노약자 및 영유아 동반 세대는 사전 점검 시간을 참고하여 주시기 바랍니다.
              </p>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setNoticeModalOpen(false)}
                className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition"
              >
                확인 및 닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Tab Content */}
      <main className="flex-1 pb-16">
        {currentTab === 'home' && (
          <div>
            {/* Hero Banner Section */}
            <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-16 sm:py-20 px-4">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0d9488_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
              <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-teal-300 text-xs sm:text-sm font-medium">
                    <Sparkles className="w-4 h-4" /> 양천 목동신시가지 대표 명품 주거단지
                  </div>
                  <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight">
                    쾌적하고 안전한 일상, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-200 to-indigo-300">
                      목동13단지 관리사무소
                    </span>
                    가 함께합니다.
                  </h1>
                  <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
                    입주민의 편의와 시설 안전을 최우선으로 생각합니다. 
                    단지 내 불편사항 신고부터 관리비 조회, 주민의견 수렴까지 온라인에서 더욱 투명하고 신속하게 처리해 드립니다.
                  </p>

                  {/* Hero Quick Metrics */}
                  <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl">
                    <div className="bg-slate-800/80 backdrop-blur rounded-xl p-3 border border-slate-700/60">
                      <p className="text-xs text-slate-400">단지 규모</p>
                      <p className="text-lg font-bold text-white mt-0.5">32개동 2,280세대</p>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur rounded-xl p-3 border border-slate-700/60">
                      <p className="text-xs text-slate-400">민원 처리율</p>
                      <p className="text-lg font-bold text-teal-400 mt-0.5">99.2% 완료</p>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur rounded-xl p-3 border border-slate-700/60">
                      <p className="text-xs text-slate-400">재활용 배출시간</p>
                      <p className="text-sm sm:text-base font-bold text-emerald-300 mt-1">수 07:00~목 06:00</p>
                    </div>
                    <div className="bg-slate-800/80 backdrop-blur rounded-xl p-3 border border-slate-700/60">
                      <p className="text-xs text-slate-400">비상 당직체계</p>
                      <p className="text-lg font-bold text-amber-300 mt-0.5">365일 상시근무</p>
                    </div>
                  </div>
                </div>

                {/* Live Complex Widget Card */}
                <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 shadow-xl text-white">
                  <div className="flex items-center justify-between pb-4 border-b border-white/15">
                    <span className="text-sm font-semibold flex items-center gap-1.5 text-teal-300">
                      <Clock className="w-4 h-4" /> 관리실 운영 현황
                    </span>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold rounded-full">
                      정상 업무중
                    </span>
                  </div>

                  <div className="mt-4 space-y-3.5 text-xs sm:text-sm">
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-slate-300">평일 근무시간</span>
                      <span className="font-semibold text-slate-100">09:00 ~ 18:00</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-slate-300">점심 및 정비시간</span>
                      <span className="font-semibold text-slate-100">12:00 ~ 13:00</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-slate-300">공식 문의메일</span>
                      <a href="mailto:yungh07@naver.com" className="font-semibold text-teal-300 hover:underline">yungh07@naver.com</a>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-slate-300">토/일/공휴일</span>
                      <span className="font-semibold text-amber-300">경비실 및 당직실 운영</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/10">
                      <span className="text-slate-300">단지 방역 소독</span>
                      <span className="font-semibold text-teal-300">매월 둘째 주 화요일</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-emerald-300 font-medium">분리수거 배출</span>
                      <span className="font-bold text-emerald-300">수 07:00 ~ 목 06:00</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/15 space-y-2">
                    <div className="flex items-center gap-2">
                      <a
                        href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%96%91%EC%82%B0%EA%B5%AC%20%EB%AA%A9%EB%8F%99%EB%8F%99%EB%A1%9C%20100"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 px-3 bg-emerald-600/90 hover:bg-emerald-600 text-white font-medium rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> 네이버지도 길찾기
                      </a>
                      <a
                        href="https://map.kakao.com/link/search/서울특별시 양천구 목동동로 100"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2 px-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition shadow-sm"
                      >
                        <Navigation className="w-3.5 h-3.5" /> 카카오맵 안내
                      </a>
                    </div>
                    <button
                      onClick={() => setCurrentTab('complaints')}
                      className="w-full py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition shadow-lg flex items-center justify-center gap-2"
                    >
                      <Wrench className="w-4 h-4" /> 우리 집 보수·민원 즉시 신청
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Action Cards Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: '불편사항·민원 접수',
                    desc: '단지 내 하자, 소음, 전기/설비 보수 요청 및 실시간 처리현황',
                    icon: Wrench,
                    color: 'text-teal-600 bg-teal-50 border-teal-200',
                    action: () => setCurrentTab('complaints'),
                    badge: '실시간 접수',
                  },
                  {
                    title: '입주민 Q&A',
                    desc: '인테리어 공사, 승강기 예약, 주차 기준 확인',
                    icon: HelpCircle,
                    color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
                    action: () => setCurrentTab('faq'),
                    badge: '자주 묻는 질문',
                  },
                  {
                    title: '주민의견수렴·투표',
                    desc: '단지 조경, 공용시설 개선 등 스마트 자치 찬반 의견',
                    icon: Vote,
                    color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
                    action: () => setCurrentTab('polls'),
                    badge: '진행중 2건',
                  },
                  {
                    title: '생활규정 및 시설안내',
                    desc: '분리수거 요일, 이사 사다리차, 비상연락망',
                    icon: FileText,
                    color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
                    action: () => setCurrentTab('info'),
                    badge: '상세 가이드',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={item.action}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-slate-200 transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`p-3 rounded-xl border ${item.color} group-hover:scale-105 transition-transform`}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      </div>
                      <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-teal-600 group-hover:translate-x-1 transition-transform">
                      <span>바로 이동하기</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Complaints & Ongoing Polls Preview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Complaints Widget */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-teal-600" />
                    <h2 className="text-base font-bold text-slate-900">최근 접수된 민원 현황</h2>
                  </div>
                  <button
                    onClick={() => setCurrentTab('complaints')}
                    className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                  >
                    전체보기 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="divide-y divide-slate-100 mt-2">
                  {complaints.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedComplaint(item)}
                      className="py-3.5 hover:bg-slate-50 px-2 rounded-xl transition cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1 truncate">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-semibold text-slate-700">{item.dong}동 {item.ho}호</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-500">{item.category}</span>
                          <span className="text-slate-300">•</span>
                          <span className="text-slate-400">{item.date}</span>
                        </div>
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {item.title}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          item.status === '처리완료'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : item.status === '처리중'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ongoing Voting Widget (Smart Indigo/Cyan Theme) */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Vote className="w-5 h-5 text-indigo-600" />
                    <h2 className="text-base font-bold text-slate-900">진행 중인 스마트 주민 찬반·의견</h2>
                  </div>
                  <button
                    onClick={() => setCurrentTab('polls')}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    투표참여 <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-4 space-y-4">
                  {polls.slice(0, 1).map((poll) => (
                    <div key={poll.id} className="bg-slate-50/80 rounded-2xl p-5 border border-indigo-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                          스마트 투표 마감 D-{Math.max(1, 15 - new Date().getDate())}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">총 {poll.totalVotes}명 참여</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-2">{poll.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{poll.desc}</p>

                      <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2.5">
                        {poll.options.map((opt) => {
                          const pct = Math.round((opt.votes / poll.totalVotes) * 100) || 0;
                          return (
                            <div key={opt.id} className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="font-medium text-slate-700 truncate">{opt.text}</span>
                                <span className="font-bold text-indigo-700">{pct}% <span className="text-slate-400 font-normal">({opt.votes}표)</span></span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className="bg-gradient-to-r from-indigo-500 to-cyan-500 h-2 rounded-full transition-all duration-700"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => setCurrentTab('polls')}
                        className="mt-4 w-full py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> 주민 의견 및 투표 참여 ({poll.comments.length}건 등록됨)
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Resident Download Hub & Monthly Schedule Strip */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
              <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold">
                      입주민 원스톱 행정지원
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold mt-2">
                      자주 찾는 단지 공식 신청서 및 서식 자료실
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
                      공사신고서, 승강기 사용신청서, 차량등록 양식을 관리사무소 방문 전 미리 다운로드하여 편리하게 작성하세요.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 shrink-0">
                    {formsData.slice(0, 2).map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDownloadForm(item.name)}
                        className="flex items-center gap-2.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-xs font-medium transition text-left"
                      >
                        <Download className="w-4 h-4 text-teal-300 shrink-0" />
                        <span className="truncate max-w-[180px]">{item.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- Tab 2: 불편사항 & 민원 접수 --- */}
        {currentTab === 'complaints' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 text-teal-600 font-semibold text-sm mb-1">
                <Wrench className="w-4 h-4" /> 민원·하자·불편사항 창구
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                입주민 불편사항 및 시설보수 접수
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                전기, 설비, 누수, 층간소음, 주차 문제 등 단지 내 불편사항을 접수해 주시면 전문 기전/관리팀이 신속히 현장을 점검하고 결과를 안내합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Submission Form */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm h-fit">
                <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-5">
                  <FileText className="w-5 h-5 text-teal-600" />
                  <h3 className="font-bold text-slate-900 text-base">새 민원 신청하기</h3>
                </div>

                <form onSubmit={handleComplaintSubmit} className="space-y-4 text-sm">
                  {/* Dong / Ho */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        동 번호 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="예: 1308"
                        required
                        value={complaintForm.dong}
                        onChange={(e) => setComplaintForm({ ...complaintForm, dong: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        호수 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        placeholder="예: 702"
                        required
                        value={complaintForm.ho}
                        onChange={(e) => setComplaintForm({ ...complaintForm, ho: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Applicant Name & Phone */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">신청인 성함</label>
                      <input
                        type="text"
                        placeholder="홍길동"
                        value={complaintForm.name}
                        onChange={(e) => setComplaintForm({ ...complaintForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">연락처</label>
                      <input
                        type="tel"
                        placeholder="010-0000-0000"
                        value={complaintForm.phone}
                        onChange={(e) => setComplaintForm({ ...complaintForm, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                      />
                    </div>
                  </div>

                  {/* Category Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      민원 분류 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={complaintForm.category}
                      onChange={(e) => setComplaintForm({ ...complaintForm, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
                    >
                      <option value="시설보수">공용부/전용부 시설보수 (배관/누수/전등)</option>
                      <option value="소음/주차">층간소음 / 지하주차장 / 불법주차</option>
                      <option value="보안/위생">보안·가로등 / 분리수거 / 단지위생·방역</option>
                      <option value="승강기">승강기(엘리베이터) 이상소음 및 점검</option>
                      <option value="기타건의">기타 단지 운영 개선 건의</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      제목 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="불편사항 요약을 입력해주세요."
                      required
                      value={complaintForm.title}
                      onChange={(e) => setComplaintForm({ ...complaintForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      상세 내용 <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      placeholder="발생 위치, 현상, 요청사항을 구체적으로 적어주시면 빠른 처리가 가능합니다."
                      required
                      value={complaintForm.content}
                      onChange={(e) => setComplaintForm({ ...complaintForm, content: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm resize-none"
                    />
                  </div>

                  {/* Photo Upload Simulation */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">현장 사진 첨부 (선택)</label>
                    <div
                      onClick={() => showToast('사진 첨부 완료: 현장 사진 1건이 안전하게 등록되었습니다.', 'info')}
                      className="border border-dashed border-slate-300 rounded-xl p-3 flex items-center justify-center gap-2 text-slate-500 hover:bg-slate-50 cursor-pointer text-xs transition"
                    >
                      <Camera className="w-4 h-4 text-teal-600" />
                      <span>클릭하여 사진 첨부 (jpg, png, 최대 10MB)</span>
                    </div>
                  </div>

                  {/* Secret toggle */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="secretCheck"
                      checked={complaintForm.isSecret}
                      onChange={(e) => setComplaintForm({ ...complaintForm, isSecret: e.target.checked })}
                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <label htmlFor="secretCheck" className="text-xs text-slate-600 font-medium select-none cursor-pointer">
                      비밀글로 등록 (신청자와 관리사무소만 확인)
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl transition shadow flex items-center justify-center gap-2 mt-4 active:scale-[0.98]"
                  >
                    <Send className="w-4 h-4" /> 민원 접수 제출하기
                  </button>
                </form>
              </div>

              {/* Real-time Status Tracker / Complaint List */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">실시간 민원 처리 현황판</h3>
                      <p className="text-xs text-slate-500">투명하고 신속한 처리 과정을 입주민과 공유합니다.</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      {['전체', '접수완료', '처리중', '처리완료'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setComplaintFilter(status)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                            complaintFilter === status
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search within complaints */}
                  <div className="relative pt-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2" />
                    <input
                      type="text"
                      placeholder="접수번호, 동/호수 또는 키워드로 검색 (예: 1308, 배수관, 소음)"
                      value={complaintSearch}
                      onChange={(e) => setComplaintSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Complaint Cards */}
                <div className="space-y-3">
                  {filteredComplaints.length > 0 ? (
                    filteredComplaints.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedComplaint(item)}
                        className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-teal-400 hover:shadow-md transition cursor-pointer group"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-500 font-mono">
                              {item.id}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-600">
                              {item.category}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${
                              item.status === '처리완료'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : item.status === '처리중'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-blue-50 text-blue-700 border border-blue-200'
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {item.content}
                        </p>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-slate-700">{item.dong}동 {item.ho}호 ({item.author})</span>
                            <span>•</span>
                            <span>{item.date}</span>
                          </div>
                          <span className="text-teal-600 font-semibold group-hover:underline flex items-center gap-1">
                            답변 코멘트 확인 <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                      <p className="text-slate-500 text-sm">해당 검색 조건의 민원 내역이 없습니다.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Complaint Detail Modal */}
            {selectedComplaint && (
              <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-scaleUp max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-mono font-bold text-teal-600">{selectedComplaint.id}</span>
                      <h3 className="font-bold text-lg text-slate-900 mt-0.5">{selectedComplaint.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedComplaint(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-4 space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <div>
                        <span className="text-slate-400">신청세대:</span>{' '}
                        <span className="font-bold text-slate-700">{selectedComplaint.dong}동 {selectedComplaint.ho}호</span>
                      </div>
                      <div>
                        <span className="text-slate-400">접수일:</span>{' '}
                        <span className="font-semibold text-slate-700">{selectedComplaint.date}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">담당부서:</span>{' '}
                        <span className="font-semibold text-teal-700">{selectedComplaint.department}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">진행상태:</span>{' '}
                        <span className="font-bold text-slate-800">{selectedComplaint.status}</span>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-xs font-bold text-slate-600 mb-1">접수 내용</h5>
                      <div className="p-3 bg-slate-50 rounded-xl text-slate-700 leading-relaxed text-xs sm:text-sm">
                        {selectedComplaint.content}
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        <span>관리사무소 조치 및 처리 결과</span>
                      </div>
                      <div className="p-3 bg-teal-50/60 border border-teal-200/80 rounded-xl text-teal-900 text-xs sm:text-sm leading-relaxed">
                        {selectedComplaint.reply}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={() => setSelectedComplaint(null)}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition"
                    >
                      닫기
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- Tab 3: 입주민 자주 묻는 질문 (FAQ) --- */}
        {currentTab === 'faq' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-teal-600 font-semibold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Resident Support & FAQ
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                입주민 자주 묻는 질문 (Q&A)
              </h1>
              <p className="text-slate-500 text-sm mt-2">
                인테리어 공사 기준, 이사 사다리차 예약, 주차 등록 등 가장 자주 문의하시는 내용을 한곳에 모았습니다.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="궁금하신 점을 검색해 보세요 (예: 인테리어 동의서, 분리수거, 승강기)"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              {faqSearch && (
                <button
                  onClick={() => setFaqSearch('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  지우기
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
              {['전체', '인테리어/이사', '주차/차량', '재활용/쓰레기', '관리비/정산', '시설/승강기', '소음/생활'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFaqCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    faqCategory === cat
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* FAQ Accordion List */}
            <div className="space-y-3">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => {
                  const isOpen = expandedFaq === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all duration-200"
                    >
                      <button
                        onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                        className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 hover:bg-slate-50 transition"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-lg bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            Q
                          </span>
                          <div>
                            <span className="text-[11px] font-semibold text-teal-600 bg-teal-50 px-2 py-0.5 rounded mr-2">
                              {faq.category}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                              {faq.question}
                            </span>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 mt-1 ${
                            isOpen ? 'rotate-180 text-teal-600' : ''
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          <div className="flex items-start gap-3 pt-3">
                            <span className="w-6 h-6 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                              A
                            </span>
                            <div className="space-y-3">
                              <p className="text-slate-800 leading-relaxed font-normal">
                                {faq.answer}
                              </p>
                              <div className="flex items-center gap-2 pt-2 text-xs text-slate-400">
                                <span># {faq.tag}</span>
                                <span>•</span>
                                <span>목동13단지 관리규약 제45조 준용</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                  <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 font-bold">검색 결과가 없습니다.</p>
                  <p className="text-slate-400 text-xs mt-1">다른 키워드로 검색하시거나 관리사무소로 직접 문의해 주세요.</p>
                </div>
              )}
            </div>

            {/* Quick Consultation Notice Banner */}
            <div className="mt-8 bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-base">찾으시는 답변이 없으신가요?</h4>
                <p className="text-xs text-slate-300 mt-1">
                  관리사무소 민원팀에 직통으로 전화 주시면 친절하고 정확하게 안내해 드립니다.
                </p>
              </div>
              <a
                href="tel:0226484321"
                className="shrink-0 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4" /> 02-2648-4321 전화연결
              </a>
            </div>
          </div>
        )}

        {/* --- Tab 4: 스마트 주민 의견수렴 및 투표 (Smart Indigo / Blue / Cyan) --- */}
        {currentTab === 'polls' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            {/* Header */}
            <div className="mb-8">
              <span className="text-indigo-600 font-semibold text-xs uppercase tracking-wider bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                Smart Community Voice & Polling
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                스마트 주민 의견수렴 및 자치 설문·투표
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                목동13단지의 주요 시설 개보수, 조경 정비, 관리비 절감 방안 등 단지의 중요한 안건을 입주민의 참여로 투명하게 결정합니다.
              </p>
            </div>

            {/* Summary Stat Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-5 shadow-sm">
                <span className="text-xs text-indigo-300">현재 진행 중 안건</span>
                <p className="text-2xl font-bold mt-1">2건</p>
                <p className="text-[11px] text-slate-300 mt-0.5">전자투표 및 의견 취합 중</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span className="text-xs text-slate-500">누적 입주민 참여수</span>
                <p className="text-2xl font-bold text-slate-900 mt-1">854명</p>
                <p className="text-[11px] text-indigo-600 font-medium mt-0.5">전체 세대의 약 37.4% 참여</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <span className="text-xs text-slate-500">투표 보안 체계</span>
                <p className="text-2xl font-bold text-teal-600 mt-1">1세대 1투표</p>
                <p className="text-[11px] text-slate-500 mt-0.5">중복참여 자동방지 암호화</p>
              </div>
            </div>

            {/* Polls Container */}
            <div className="space-y-8">
              {polls.map((poll) => (
                <div
                  key={poll.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
                >
                  {/* Poll Title & Meta */}
                  <div className="border-b border-slate-100 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center gap-1">
                        <Vote className="w-3.5 h-3.5 text-indigo-600" /> {poll.badge} 자치 투표
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> 투표 마감일: {poll.endDate} (총 {poll.totalVotes}명 참여)
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                      {poll.title}
                    </h2>
                    <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                      {poll.desc}
                    </p>
                  </div>

                  {/* Voting Options */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-slate-700">투표 항목 선택 (원하시는 항목을 클릭하시면 투표가 반영됩니다)</p>
                    {poll.options.map((option) => {
                      const percentage = Math.round((option.votes / poll.totalVotes) * 100) || 0;
                      const isSelected = poll.userVoted === option.id;

                      return (
                        <div
                          key={option.id}
                          onClick={() => handleVote(poll.id, option.id)}
                          className={`p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500/20 shadow-sm'
                              : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center justify-between relative z-10 mb-2">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition ${
                                  isSelected
                                    ? 'border-indigo-600 bg-indigo-600 text-white'
                                    : 'border-slate-300 bg-white'
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </div>
                              <span className="text-sm font-semibold text-slate-900">
                                {option.text}
                              </span>
                            </div>
                            <span className="text-xs font-bold text-indigo-900">
                              {percentage}% <span className="text-slate-400 font-normal">({option.votes}표)</span>
                            </span>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div
                              className={`h-2.5 rounded-full transition-all duration-700 ${
                                isSelected ? 'bg-gradient-to-r from-indigo-600 to-cyan-500' : 'bg-slate-300'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {poll.userVoted && (
                    <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 text-xs font-medium flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span>입주민님의 투표 참여가 기록되었습니다. 결과는 마감일 입대의 의결 자료로 정식 보고됩니다.</span>
                    </div>
                  )}

                  {/* Comment & Feedback Section */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-indigo-600" />
                      입주민 건설적 의견 및 토론 ({poll.comments.length})
                    </h4>

                    {/* New Comment Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="본 안건에 대한 입주민 의견을 남겨주세요."
                        value={newCommentInput[poll.id] || ''}
                        onChange={(e) =>
                          setNewCommentInput({
                            ...newCommentInput,
                            [poll.id]: e.target.value,
                          })
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(poll.id);
                        }}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => handleAddComment(poll.id)}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition shrink-0 shadow-sm"
                      >
                        등록
                      </button>
                    </div>

                    {/* Comment List */}
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {poll.comments.map((cmt, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                          <div className="flex justify-between items-center text-slate-400 mb-1">
                            <span className="font-semibold text-slate-700">{cmt.author}</span>
                            <span>{cmt.date}</span>
                          </div>
                          <p className="text-slate-800 leading-relaxed">{cmt.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- Tab 5: 단지 및 관리비 안내 --- */}
        {currentTab === 'info' && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
            {/* Header */}
            <div className="mb-8">
              <span className="text-teal-600 font-semibold text-xs uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                Living & Facility Information
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                단지 시설 및 생활 기본 수칙 안내
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                목동신시가지 13단지 주민 여러분의 쾌적한 주거환경을 위한 분리수거 일정 및 관리실 연락망입니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: 분리수거 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Trash2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">재활용 분리수거 배출 안내</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="p-3 rounded-lg bg-teal-50/70 border border-teal-200">
                    <span className="font-bold text-teal-900 text-sm block mb-1">배출 요일 및 시간</span>
                    <span className="text-teal-800 font-bold block text-sm">매주 수요일 07:00 ~ 목요일 06:00</span>
                    <span className="text-red-600 text-[11px] font-semibold mt-1 block">※ 목요일 오전 06시 수거함 마감 후 배출 절대 금지</span>
                  </div>
                  <div className="pt-2 text-slate-600 leading-relaxed space-y-1">
                    <p className="font-semibold text-slate-800">품목별 배출 요령:</p>
                    <p>• <strong>스티로폼</strong>: 흰색 완충재만 가능 (이물질/테이프/송장 제거 필수)</p>
                    <p>• <strong>플라스틱/투명페트</strong>: 내용물 세척 후 라벨 분리 및 압착 배출</p>
                    <p>• <strong>비닐류</strong>: 깨끗이 씻어 건조된 비닐만 투명 봉투에 담아 배출</p>
                    <p>• <strong>캔·고철/병류</strong>: 잔여물 비우고 담배꽁초 등 이물질 투입 금지</p>
                    <p>• <strong>종이/박스</strong>: 택배 테이프 및 철핀 제거 후 납작하게 묶어 배출</p>
                  </div>
                </div>
              </div>

              {/* Card 2: 주차 관리 규정 */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">단지 내 주차 및 충전 규정</h3>
                <div className="space-y-2 text-xs text-slate-600">
                  <p className="leading-relaxed">
                    • 1세대 1차량: 관리비 기본 포함 (무료 등록)<br />
                    • 2차량 이상: 세대당 월 추가 주차부담금 부과<br />
                    • 전기차 충전구역: 충전 완료 후 즉시 이동 주차 (위반 시 완속 14시간, 급속 1시간 초과 과태료 부과)
                  </p>
                  <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-100 text-blue-900 font-medium">
                    지하주차장 진입 제한 높이: 2.3m
                  </div>
                </div>
              </div>

              {/* Card 3: 관리사무소 직통 연락망 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-slate-900">직통 전화 및 주요 연락처</h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">관리과 / 서무</span>
                  <span className="font-bold text-slate-800">02-2648-4321</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">경리과 (관리비 문의)</span>
                  <span className="font-bold text-slate-800">02-2648-4322</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">기전과 (전기·설비 고장)</span>
                  <span className="font-bold text-slate-800">02-2648-4323</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">정문 경비실</span>
                  <span className="font-bold text-slate-800">02-2648-4324</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-amber-600 font-bold">야간 당직실 (긴급)</span>
                  <span className="font-bold text-amber-600">02-2648-4325</span>
                </div>
              </div>
            </div>
          </div>

          {/* Resident Download Center Section */}
          <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-base text-slate-900">입주민 주요 서식 및 양식 다운로드</h3>
              </div>
              <span className="text-xs text-slate-400">PDF / 한글 양식 제공</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {formsData.map((form, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl transition cursor-pointer"
                  onClick={() => handleDownloadForm(form.name)}
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">{form.name}</p>
                      <p className="text-[11px] text-slate-400">{form.format} • {form.size}</p>
                    </div>
                  </div>
                  <button
                    className="p-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition"
                    title="다운로드"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Complex Map & Specs */}
          <div className="mt-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-600" /> 목동신시가지 13단지 기본 현황 및 오시는 길
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%96%91%EC%82%B0%EA%B5%AC%20%EB%AA%A9%EB%8F%99%EB%8F%99%EB%A1%9C%20100"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700 transition shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> 네이버지도 길안내
                </a>
                <a
                  href="https://map.kakao.com/link/search/서울특별시 양천구 목동동로 100"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-slate-950 rounded-xl text-xs font-bold hover:bg-yellow-500 transition shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" /> 카카오맵 길안내
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mt-4">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-slate-400">단지 도로명주소</p>
                <p className="text-sm font-bold text-slate-800 mt-1">양천구 목동동로 100</p>
                <p className="text-[11px] text-teal-600 mt-0.5">관리동 2층 관리사무소</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-slate-400">총 동수 / 세대수</p>
                <p className="text-sm font-bold text-slate-800 mt-1">32개동 / 2,280세대</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-slate-400">난방 방식</p>
                <p className="text-sm font-bold text-slate-800 mt-1">지역난방, 열병합</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="text-slate-400">학군 및 교통</p>
                <p className="text-sm font-bold text-slate-800 mt-1">갈산초, 양천구청역 2호선</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Building2 className="w-5 h-5 text-teal-400" />
                목동신시가지 13단지 관리사무소
              </div>
              <p className="text-slate-400 leading-relaxed text-xs">
                서울특별시 양천구 목동동로 100 (목동신시가지 13단지 아파트 관리사무소) <br />
                사업자등록번호: 117-82-XXXXX | 소장: 주택관리사 자격 등록 <br />
                <span className="text-teal-300 font-semibold">위탁관리 : 부동산자산관리사 윤시스템</span>
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  href="https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%96%91%EC%82%B0%EA%B5%AC%20%EB%AA%A9%EB%8F%99%EB%8F%99%EB%A1%9C%20100"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-900/60 border border-emerald-600/40 text-emerald-300 hover:text-white transition text-xs"
                >
                  <ExternalLink className="w-3 h-3" /> 네이버지도 바로가기
                </a>
                <a
                  href="https://map.kakao.com/link/search/서울특별시 양천구 목동동로 100"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-yellow-950/70 border border-yellow-600/40 text-yellow-300 hover:text-white transition text-xs"
                >
                  <Navigation className="w-3 h-3" /> 카카오맵 바로가기
                </a>
              </div>
              <p className="text-slate-400 text-xs pt-1">
                대표전화: 02-2648-4321 | 팩스: 02-2648-4329 | 이메일:{' '}
                <a href="mailto:yungh07@naver.com" className="text-teal-400 underline font-medium">
                  yungh07@naver.com
                </a>
              </p>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 mb-3 text-sm">주요 서비스 바로가기</h5>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setCurrentTab('complaints')} className="hover:text-teal-400 transition">
                    불편사항 및 하자보수 접수
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('faq')} className="hover:text-teal-400 transition">
                    입주민 Q&A 및 규정
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('polls')} className="hover:text-teal-400 transition">
                    주민 찬반투표·의견수렴
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('info')} className="hover:text-teal-400 transition">
                    재활용 배출요일 및 주차안내
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-200 mb-3 text-sm">긴급 상담 체계</h5>
              <p className="text-slate-400 leading-relaxed text-xs">
                야간 및 공휴일 긴급 누수나 정전 발생 시 당직실(02-2648-4325)로 즉시 연락 바랍니다.
              </p>
              <div className="mt-3">
                <span className="inline-block px-3 py-1 rounded bg-teal-900/60 border border-teal-500/30 text-teal-300 font-bold text-[11px]">
                  24시간 비상대기 기전팀 가동
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
            <span>© 2026 목동신시가지 13단지 입주자대표회의 & 관리사무소 (위탁관리: 부동산자산관리사 윤시스템). All rights reserved.</span>
            <div className="flex gap-4">
              <span className="hover:text-slate-300 cursor-pointer">개인정보처리방침</span>
              <span className="hover:text-slate-300 cursor-pointer">단지관리규약</span>
              <span className="hover:text-slate-300 cursor-pointer">영상정보처리기기운영관리방침</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}