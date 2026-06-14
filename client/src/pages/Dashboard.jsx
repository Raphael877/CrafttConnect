import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  User,
  Settings,
  Image as ImageIcon,
  MessageSquare,
  Star,
  LogOut,
  ChevronRight,
  Trash2,
  Plus,
  MapPin,
  Check,
  AlertCircle,
  Sparkles,
  Upload,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../config";

const DashboardContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.colors.background};
`;

const Sidebar = styled.div`
  width: 280px;
  background: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 80px;
    padding: 1rem 0.5rem;
    align-items: center;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  color: ${({ active, theme }) => (active ? "white" : theme.colors.textMuted)};
  background: ${({ active, theme }) =>
    active ? theme.colors.primary : "transparent"};
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  width: 100%;

  &:hover {
    background: ${({ active, theme }) =>
      active ? theme.colors.primary : "rgba(255,255,255,0.05)"};
    color: ${({ active, theme }) => (active ? "white" : theme.colors.text)};
  }

  span {
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 3rem;
  max-width: 1200px;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  margin-bottom: 3rem;
  h1 {
    font-size: 2.2rem;
    font-family: ${({ theme }) => theme.fonts.heading};
  }
  p {
    color: ${({ theme }) => theme.colors.textMuted};
    margin-top: 0.5rem;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.sm};

  .label {
    color: ${({ theme }) => theme.colors.textMuted};
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
  }
  .value {
    font-size: 1.8rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const Section = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 24px;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 2rem;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  &:last-child {
    border-bottom: none;
  }

  .info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

// Form and UI elements
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 700px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.9rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  color: white;
  outline: none;
  font-size: 1rem;
  transition: all 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const TextArea = styled.textarea`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  color: white;
  outline: none;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.shadows.glow};
  }
`;

const Select = styled.select`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 0.8rem 1.2rem;
  color: white;
  outline: none;
  font-size: 1rem;
  transition: all 0.2s;
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
  option {
    background: ${({ theme }) => theme.colors.surface};
    color: white;
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 0.5rem;

  input {
    width: 18px;
    height: 18px;
    accent-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${({ variant, theme }) =>
    variant === "secondary" ? "transparent" : theme.colors.primary};
  border: ${({ variant, theme }) =>
    variant === "secondary" ? `1px solid ${theme.colors.border}` : "none"};
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ variant, theme }) =>
      variant === "secondary"
        ? theme.colors.border
        : theme.colors.primaryHover};
    transform: translateY(-1px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AlertMessage = styled.div`
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: ${({ type }) =>
    type === "error" ? "rgba(239, 68, 68, 0.1)" : "rgba(16, 185, 129, 0.1)"};
  color: ${({ type, theme }) =>
    type === "error" ? theme.colors.error : theme.colors.success};
  border: 1px solid
    ${({ type, theme }) =>
      type === "error" ? "rgba(239, 68, 68, 0.2)" : "rgba(16, 185, 129, 0.2)"};
`;

const ProfilePicSection = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  img {
    width: 100px;
    height: 100px;
    border-radius: 24px;
    object-fit: cover;
    border: 3px solid ${({ theme }) => theme.colors.primary};
  }
`;

const SkillInputRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  background: rgba(99, 102, 241, 0.15);
  color: #a5b4fc;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid rgba(99, 102, 241, 0.2);

  button {
    background: transparent;
    border: none;
    color: #ef4444;
    cursor: pointer;
    font-size: 0.95rem;
    padding: 0;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const GalleryCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }

  .info {
    padding: 1rem;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .delete-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    background: rgba(239, 68, 68, 0.9);
    color: white;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background: #dc2626;
      transform: scale(1.1);
    }
  }
`;

const StarRating = styled.div`
  display: flex;
  gap: 0.3rem;
  margin: 0.5rem 0;

  button {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    color: #f59e0b;
    outline: none;
  }
`;

const ReviewCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;

  .reviewer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8rem;
  }

  .user-badge {
    display: flex;
    align-items: center;
    gap: 0.8rem;

    img {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
    }
    .title-info {
      font-weight: 600;
    }
  }

  .comment {
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.6;
    font-size: 0.95rem;
  }

  .date {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-top: 0.8rem;
  }
`;

const ConversationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(255, 255, 255, 0.02);
  }

  .details {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    img {
      width: 50px;
      height: 50px;
      border-radius: 14px;
      object-fit: cover;
    }

    .name-block {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .name {
      font-weight: 600;
      font-size: 1.05rem;
    }
    .role-badge {
      font-size: 0.75rem;
      background: rgba(99, 102, 241, 0.1);
      color: ${({ theme }) => theme.colors.primary};
      padding: 0.1rem 0.5rem;
      border-radius: 4px;
      width: fit-content;
    }
    .last-msg {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.textMuted};
      max-width: 350px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .meta {
    text-align: right;
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const FileUploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px dashed ${({ theme }) => theme.colors.border};
  padding: 0.8rem 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }

  input {
    display: none;
  }
`;

const Dashboard = () => {
  const [user, setUser] = useState(() => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  });
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Alert and loader states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Tab loaded data states
  const [conversations, setConversations] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [myReviews, setMyReviews] = useState([]);

  // Form states
  // 1. Settings Form
  const [settingsForm, setSettingsForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    password: "",
  });

  // 2. Portfolio Form (Artisan only)
  const [portfolioForm, setPortfolioForm] = useState({
    businessName: "",
    bio: "",
    state: "",
    city: "",
    availability: true,
    skills: [],
  });
  const [skillInput, setSkillInput] = useState("");
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    imageUrl: "",
    description: "",
  });

  // 3. Review Submittal Form (Customer only)
  const [reviewForm, setReviewForm] = useState({
    artisanId: "",
    rating: 5,
    comment: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Initialize settings form values
      setSettingsForm({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        profilePicture: user.profilePicture || "",
        password: "",
      });

      // Initialize artisan portfolio values if applicable
      if (user.role === "artisan" && user.artisanProfile) {
        setPortfolioForm({
          businessName: user.artisanProfile.businessName || "",
          bio: user.artisanProfile.bio || "",
          state: user.artisanProfile.location?.state || "",
          city: user.artisanProfile.location?.city || "",
          availability:
            user.artisanProfile.availability !== undefined
              ? user.artisanProfile.availability
              : true,
          skills: user.artisanProfile.skills || [],
        });
      }
    }
  }, [user, navigate]);

  // Load backend data depending on active tab
  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        if (activeTab === "messages") {
          // Fetch chats
          const resConversations = await axios.get(
            `${API_URL}/api/chat/conversations`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            },
          );
          setConversations(resConversations.data);

          // Fetch all artisans in case they want to start a new chat
          const resArtisans = await axios.get(`${API_URL}/api/artisans`);
          setArtisans(resArtisans.data);
        } else if (activeTab === "reviews") {
          // Fetch my reviews
          const resReviews = await axios.get(
            `${API_URL}/api/reviews/my-reviews`,
            {
              headers: { Authorization: `Bearer ${user.token}` },
            },
          );
          setMyReviews(resReviews.data);

          // If customer, fetch artisans to review
          if (user.role === "customer") {
            const resArtisans = await axios.get(`${API_URL}/api/artisans`);
            setArtisans(resArtisans.data);
            if (resArtisans.data.length > 0) {
              setReviewForm((prev) => ({
                ...prev,
                artisanId: resArtisans.data[0]._id,
              }));
            }
          }
        }
      } catch (err) {
        console.error("Error loading tab data:", err);
      }
    };
    loadData();
  }, [activeTab, user]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const showFeedback = (type, message) => {
    if (type === "success") {
      setSuccessMsg(message);
      setErrorMsg("");
    } else {
      setErrorMsg(message);
      setSuccessMsg("");
    }
    // Auto clear alert
    setTimeout(() => {
      setSuccessMsg("");
      setErrorMsg("");
    }, 4000);
  };

  // Convert files to base64 string
  const handleImageFileChange = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle general Settings Profile Update
  const handleSettingsSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${API_URL}/api/auth/profile`,
        settingsForm,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );

      // Update local storage and current context user state
      const updatedUser = { ...user, ...data };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUser(updatedUser);
      showFeedback("success", "Profile settings updated successfully!");
    } catch (err) {
      showFeedback(
        "error",
        err.response?.data?.message || "Failed to update settings",
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Artisan Profile details (business info, location, skills)
  const handleArtisanProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        businessName: portfolioForm.businessName,
        bio: portfolioForm.bio,
        skills: portfolioForm.skills,
        availability: portfolioForm.availability,
        location: {
          state: portfolioForm.state,
          city: portfolioForm.city,
        },
      };

      const { data } = await axios.put(`${API_URL}/api/auth/profile`, payload, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      const updatedUser = { ...user, ...data };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUser(updatedUser);
      showFeedback("success", "Artisan details saved successfully!");
    } catch (err) {
      showFeedback(
        "error",
        err.response?.data?.message || "Failed to save artisan profile",
      );
    } finally {
      setLoading(false);
    }
  };

  // Add skill tag
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (
      skillInput.trim() &&
      !portfolioForm.skills.includes(skillInput.trim())
    ) {
      setPortfolioForm((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  // Remove skill tag
  const handleRemoveSkill = (skillToDelete) => {
    setPortfolioForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToDelete),
    }));
  };

  // Upload portfolio gallery item
  const handleAddPortfolioItem = async (e) => {
    e.preventDefault();
    if (!newPortfolioItem.imageUrl || !newPortfolioItem.description) {
      showFeedback("error", "Both photo image and description are required.");
      return;
    }
    setLoading(true);
    try {
      // Append item to current user portfolio list
      const currentPortfolio = user.artisanProfile?.portfolio || [];
      const updatedPortfolio = [...currentPortfolio, newPortfolioItem];

      // Save using update profile endpoint
      const { data } = await axios.put(
        `${API_URL}/api/auth/profile`,
        {
          portfolio: updatedPortfolio,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );

      const updatedUser = { ...user, ...data };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setNewPortfolioItem({ imageUrl: "", description: "" });
      showFeedback("success", "Gallery item uploaded successfully!");
    } catch (err) {
      showFeedback(
        "error",
        err.response?.data?.message || "Failed to upload project item",
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete portfolio gallery item
  const handleDeletePortfolioItem = async (indexToDelete) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    setLoading(true);
    try {
      const currentPortfolio = user.artisanProfile?.portfolio || [];
      const updatedPortfolio = currentPortfolio.filter(
        (_, idx) => idx !== indexToDelete,
      );

      const { data } = await axios.put(
        `${API_URL}/api/auth/profile`,
        {
          portfolio: updatedPortfolio,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );

      const updatedUser = { ...user, ...data };
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setUser(updatedUser);
      showFeedback("success", "Gallery item deleted successfully.");
    } catch (err) {
      showFeedback(
        "error",
        err.response?.data?.message || "Failed to delete project item",
      );
    } finally {
      setLoading(false);
    }
  };

  // Submit new review (Customer role only)
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.artisanId || !reviewForm.comment.trim()) {
      showFeedback("error", "Please select an artisan and leave a comment.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/reviews`, reviewForm, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setReviewForm({
        artisanId: artisans[0]?._id || "",
        rating: 5,
        comment: "",
      });
      showFeedback("success", "Thank you! Your review has been submitted.");

      // Refresh reviews list
      const resReviews = await axios.get(`${API_URL}/api/reviews/my-reviews`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setMyReviews(resReviews.data);
    } catch (err) {
      showFeedback(
        "error",
        err.response?.data?.message || "Failed to submit review",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  // View Renders
  // 1. Overview
  const renderOverview = () => {
    return (
      <>
        <Header>
          <h1>Welcome, {user.name}</h1>
          <p>Here's what's happening with your CraftConnect account today.</p>
        </Header>

        <StatsGrid>
          <StatCard>
            <div className="label">Total Conversations</div>
            <div className="value">
              {conversations.length || 0}{" "}
              <MessageSquare size={22} color="#6366f1" />
            </div>
          </StatCard>
          {user.role === "artisan" ? (
            <>
              <StatCard>
                <div className="label">Gallery Projects</div>
                <div className="value">
                  {user.artisanProfile?.portfolio?.length || 0}{" "}
                  <ImageIcon size={22} color="#ec4899" />
                </div>
              </StatCard>
              <StatCard>
                <div className="label">Average Rating</div>
                <div className="value">
                  {(user.artisanProfile?.rating || 0).toFixed(1)}{" "}
                  <Star
                    size={20}
                    fill="#f59e0b"
                    color="#f59e0b"
                    style={{ display: "inline" }}
                  />
                </div>
              </StatCard>
            </>
          ) : (
            <StatCard>
              <div className="label">Reviews Submitted</div>
              <div className="value">
                {myReviews.length || 0}{" "}
                <Star
                  size={20}
                  fill="#f59e0b"
                  color="#f59e0b"
                  style={{ display: "inline" }}
                />
              </div>
            </StatCard>
          )}
        </StatsGrid>

        <Section>
          <h3
            style={{
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Sparkles size={20} color="#6366f1" /> Recent System Log
          </h3>
          <ListItem>
            <div className="info">
              <div
                style={{
                  padding: "0.8rem",
                  background: "rgba(99, 102, 241, 0.1)",
                  borderRadius: "10px",
                  color: "#6366f1",
                }}
              >
                <User size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>
                  Active session initialized
                </div>
                <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                  Session token expires in 30 days
                </div>
              </div>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
              Just now
            </span>
          </ListItem>
          <ListItem>
            <div className="info">
              <div
                style={{
                  padding: "0.8rem",
                  background: "rgba(16, 185, 129, 0.1)",
                  borderRadius: "10px",
                  color: "#10b981",
                }}
              >
                <Check size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>Database synced</div>
                <div style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                  Local backup persistence verified
                </div>
              </div>
            </div>
            <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Today</span>
          </ListItem>
        </Section>
      </>
    );
  };

  // 2. Settings (Profile Settings)
  const renderSettings = () => {
    return (
      <>
        <Header>
          <h1>Profile Settings</h1>
          <p>Update your personal details, profile picture and credentials.</p>
        </Header>

        <Section>
          {errorMsg && (
            <AlertMessage type="error">
              <AlertCircle size={20} /> {errorMsg}
            </AlertMessage>
          )}
          {successMsg && (
            <AlertMessage type="success">
              <Check size={20} /> {successMsg}
            </AlertMessage>
          )}

          <FormContainer onSubmit={handleSettingsSave}>
            <ProfilePicSection>
              <img
                src={
                  settingsForm.profilePicture ||
                  "https://via.placeholder.com/300?text=Profile"
                }
                alt="Profile Preview"
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                <FileUploadButton>
                  <Upload size={18} /> Upload Image File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageFileChange(e, (base64) =>
                        setSettingsForm((prev) => ({
                          ...prev,
                          profilePicture: base64,
                        })),
                      )
                    }
                  />
                </FileUploadButton>
                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Or enter an image URL below:
                </div>
              </div>
            </ProfilePicSection>

            <FormGroup>
              <label>Profile Image URL</label>
              <Input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={settingsForm.profilePicture}
                onChange={(e) =>
                  setSettingsForm({
                    ...settingsForm,
                    profilePicture: e.target.value,
                  })
                }
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <label>Full Name</label>
                <Input
                  type="text"
                  required
                  value={settingsForm.name}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, name: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <label>Email Address</label>
                <Input
                  type="email"
                  required
                  value={settingsForm.email}
                  onChange={(e) =>
                    setSettingsForm({ ...settingsForm, email: e.target.value })
                  }
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <label>Phone Number</label>
                <Input
                  type="text"
                  value={settingsForm.phoneNumber}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup>
                <label>Change Password (optional)</label>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={settingsForm.password}
                  onChange={(e) =>
                    setSettingsForm({
                      ...settingsForm,
                      password: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </FormRow>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving Changes..." : "Save Settings"}
            </Button>
          </FormContainer>
        </Section>
      </>
    );
  };

  // 3. Portfolio (Artisan only)
  const renderPortfolio = () => {
    return (
      <>
        <Header>
          <h1>Artisan Portfolio & Info</h1>
          <p>
            Configure your business information, services, skills, and show off
            your project gallery.
          </p>
        </Header>

        {errorMsg && (
          <AlertMessage type="error">
            <AlertCircle size={20} /> {errorMsg}
          </AlertMessage>
        )}
        {successMsg && (
          <AlertMessage type="success">
            <Check size={20} /> {successMsg}
          </AlertMessage>
        )}

        <Section style={{ marginBottom: "3rem" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>
            Business Profile & Location
          </h3>
          <FormContainer onSubmit={handleArtisanProfileSave}>
            <FormRow>
              <FormGroup>
                <label>Business Name</label>
                <Input
                  type="text"
                  placeholder="e.g. Olu Electricals"
                  required
                  value={portfolioForm.businessName}
                  onChange={(e) =>
                    setPortfolioForm({
                      ...portfolioForm,
                      businessName: e.target.value,
                    })
                  }
                />
              </FormGroup>
              <FormGroup style={{ justifyContent: "center" }}>
                <CheckboxContainer>
                  <input
                    type="checkbox"
                    checked={portfolioForm.availability}
                    onChange={(e) =>
                      setPortfolioForm({
                        ...portfolioForm,
                        availability: e.target.checked,
                      })
                    }
                  />
                  I am currently available for hire
                </CheckboxContainer>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <label>City</label>
                <Input
                  type="text"
                  placeholder="e.g. Ikeja"
                  required
                  value={portfolioForm.city}
                  onChange={(e) =>
                    setPortfolioForm({ ...portfolioForm, city: e.target.value })
                  }
                />
              </FormGroup>
              <FormGroup>
                <label>State</label>
                <Input
                  type="text"
                  placeholder="e.g. Lagos"
                  required
                  value={portfolioForm.state}
                  onChange={(e) =>
                    setPortfolioForm({
                      ...portfolioForm,
                      state: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label>Work Description / Bio</label>
              <TextArea
                placeholder="Tell clients about your experience, training, and the value you provide..."
                value={portfolioForm.bio}
                onChange={(e) =>
                  setPortfolioForm({ ...portfolioForm, bio: e.target.value })
                }
              />
            </FormGroup>

            <FormGroup>
              <label>Skills & Specialties</label>
              <SkillInputRow>
                <Input
                  type="text"
                  placeholder="Add skill (e.g. Electrician, Plumbing)"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />
                <Button variant="secondary" onClick={handleAddSkill}>
                  <Plus size={18} /> Add
                </Button>
              </SkillInputRow>
              <TagContainer>
                {portfolioForm.skills.map((skill) => (
                  <Tag key={skill}>
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      &times;
                    </button>
                  </Tag>
                ))}
                {portfolioForm.skills.length === 0 && (
                  <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                    No skills added yet.
                  </p>
                )}
              </TagContainer>
            </FormGroup>

            <Button type="submit" disabled={loading}>
              {loading ? "Saving Profile..." : "Save Profile & Skills"}
            </Button>
          </FormContainer>
        </Section>

        <Section>
          <h3 style={{ marginBottom: "1.5rem" }}>Project Gallery Management</h3>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.9rem",
              marginBottom: "2rem",
            }}
          >
            Upload photos of your completed projects to showcase your
            craftsmanship to clients.
          </p>

          <FormContainer
            onSubmit={handleAddPortfolioItem}
            style={{
              borderBottom: "1px solid #334155",
              paddingBottom: "2.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <h4 style={{ color: "white" }}>Upload New Project Photo</h4>
            <FormRow>
              <FormGroup>
                <label>Project Photo</label>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <FileUploadButton>
                    <Upload size={18} /> Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageFileChange(e, (base64) =>
                          setNewPortfolioItem((prev) => ({
                            ...prev,
                            imageUrl: base64,
                          })),
                        )
                      }
                    />
                  </FileUploadButton>
                  {newPortfolioItem.imageUrl && (
                    <span style={{ color: "#10b981", fontSize: "0.85rem" }}>
                      Photo loaded.
                    </span>
                  )}
                </div>
              </FormGroup>
              <FormGroup>
                <label>Photo URL (Optional alternative)</label>
                <Input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newPortfolioItem.imageUrl}
                  onChange={(e) =>
                    setNewPortfolioItem({
                      ...newPortfolioItem,
                      imageUrl: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label>Work/Project Description</label>
              <Input
                type="text"
                placeholder="e.g. Modern kitchen cabinets install"
                value={newPortfolioItem.description}
                onChange={(e) =>
                  setNewPortfolioItem({
                    ...newPortfolioItem,
                    description: e.target.value,
                  })
                }
              />
            </FormGroup>

            <Button
              type="submit"
              disabled={loading}
              style={{ alignSelf: "flex-start" }}
            >
              Upload to Gallery
            </Button>
          </FormContainer>

          <h4 style={{ color: "white" }}>Current Projects</h4>
          <GalleryGrid>
            {user.artisanProfile?.portfolio?.map((item, index) => (
              <GalleryCard key={index}>
                <img src={item.imageUrl} alt={item.description} />
                <div className="info">{item.description}</div>
                <button
                  className="delete-btn"
                  onClick={() => handleDeletePortfolioItem(index)}
                  title="Delete project"
                >
                  <Trash2 size={16} />
                </button>
              </GalleryCard>
            ))}
          </GalleryGrid>
          {(!user.artisanProfile?.portfolio ||
            user.artisanProfile.portfolio.length === 0) && (
            <p style={{ color: "#64748b", marginTop: "1.5rem" }}>
              No portfolio projects uploaded yet. Add your first project above!
            </p>
          )}
        </Section>
      </>
    );
  };

  // 4. Messages (Chat and Conversations list)
  const renderMessages = () => {
    return (
      <>
        <Header>
          <h1>My Messages</h1>
          <p>
            Exchange messages and chat with registered customers and artisans on
            CraftConnect.
          </p>
        </Header>

        <Section style={{ marginBottom: "3rem" }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Active Chats</h3>
          <div>
            {conversations.map((chat, idx) => (
              <ConversationItem
                key={idx}
                onClick={() => navigate(`/chat/${chat.partner._id}`)}
              >
                <div className="details">
                  <img
                    src={
                      chat.partner.profilePicture ||
                      "https://via.placeholder.com/300?text=Profile"
                    }
                    alt={chat.partner.name}
                  />
                  <div className="name-block">
                    <div className="name">{chat.partner.name}</div>
                    <div className="role-badge">{chat.partner.role}</div>
                    <div className="last-msg">{chat.lastMessage}</div>
                  </div>
                </div>
                <div className="meta">
                  <div>{new Date(chat.timestamp).toLocaleDateString()}</div>
                  <div style={{ marginTop: "0.4rem" }}>
                    {new Date(chat.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </ConversationItem>
            ))}
            {conversations.length === 0 && (
              <p style={{ color: "#94a3b8" }}>
                You have no active chats. Send a message to one of the artisans
                below to get started!
              </p>
            )}
          </div>
        </Section>

        <Section>
          <h3 style={{ marginBottom: "1.5rem" }}>
            Discover Artisans to Chat With
          </h3>
          <p
            style={{
              color: "#94a3b8",
              fontSize: "0.9rem",
              marginBottom: "2rem",
            }}
          >
            Click on any artisan below to start chatting and inquire about
            services.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {artisans
              .filter((art) => art._id !== user._id)
              .map((artisan) => (
                <Card key={artisan._id}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src={
                        artisan.profilePicture ||
                        "https://via.placeholder.com/300?text=Profile"
                      }
                      alt={artisan.name}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 12,
                        objectFit: "cover",
                      }}
                    />
                    <div>
                      <h4 style={{ color: "white", fontSize: "1.1rem" }}>
                        {artisan.name}
                      </h4>
                      <p
                        style={{
                          color: "#6366f1",
                          fontSize: "0.9rem",
                          fontWeight: 500,
                        }}
                      >
                        {artisan.artisanProfile?.businessName}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          color: "#94a3b8",
                          fontSize: "0.8rem",
                          marginTop: "0.2rem",
                        }}
                      >
                        <MapPin size={12} />{" "}
                        {artisan.artisanProfile?.location?.city},{" "}
                        {artisan.artisanProfile?.location?.state}
                      </div>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#94a3b8",
                      flex: 1,
                      lineBreak: "anywhere",
                    }}
                  >
                    {artisan.artisanProfile?.bio
                      ? artisan.artisanProfile.bio.substring(0, 80) + "..."
                      : "No bio provided."}
                  </p>
                  <Button
                    onClick={() => navigate(`/chat/${artisan._id}`)}
                    style={{ padding: "0.6rem 1rem", fontSize: "0.9rem" }}
                  >
                    Chat Now
                  </Button>
                </Card>
              ))}
          </div>
        </Section>
      </>
    );
  };

  // 5. Reviews
  const renderReviews = () => {
    return (
      <>
        <Header>
          <h1>Ratings & Client Reviews</h1>
          <p>Read customer reviews and manage ratings left on profiles.</p>
        </Header>

        {errorMsg && (
          <AlertMessage type="error">
            <AlertCircle size={20} /> {errorMsg}
          </AlertMessage>
        )}
        {successMsg && (
          <AlertMessage type="success">
            <Check size={20} /> {successMsg}
          </AlertMessage>
        )}

        {user.role === "customer" ? (
          <>
            <Section style={{ marginBottom: "3rem" }}>
              <h3 style={{ marginBottom: "1.5rem" }}>
                Write a Review for an Artisan
              </h3>
              <FormContainer onSubmit={handleReviewSubmit}>
                <FormRow>
                  <FormGroup>
                    <label>Select Artisan</label>
                    <Select
                      value={reviewForm.artisanId}
                      onChange={(e) =>
                        setReviewForm({
                          ...reviewForm,
                          artisanId: e.target.value,
                        })
                      }
                      required
                    >
                      {artisans.map((art) => (
                        <option key={art._id} value={art._id}>
                          {art.name} (
                          {art.artisanProfile?.businessName ||
                            "No Business Name"}
                          )
                        </option>
                      ))}
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <label>Star Rating</label>
                    <StarRating>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() =>
                            setReviewForm({ ...reviewForm, rating: star })
                          }
                        >
                          <Star
                            size={28}
                            fill={
                              star <= reviewForm.rating
                                ? "#f59e0b"
                                : "transparent"
                            }
                            color="#f59e0b"
                          />
                        </button>
                      ))}
                    </StarRating>
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <label>Review Comments</label>
                  <TextArea
                    placeholder="Describe your experience working with this artisan..."
                    value={reviewForm.comment}
                    onChange={(e) =>
                      setReviewForm({ ...reviewForm, comment: e.target.value })
                    }
                    required
                  />
                </FormGroup>

                <Button type="submit" disabled={loading}>
                  {loading ? "Submitting Review..." : "Submit Review"}
                </Button>
              </FormContainer>
            </Section>

            <Section>
              <h3 style={{ marginBottom: "1.5rem" }}>My Written Reviews</h3>
              <div>
                {myReviews.map((rev) => (
                  <ReviewCard key={rev._id}>
                    <div className="reviewer-header">
                      <div className="user-badge">
                        <img
                          src={
                            rev.artisan?.profilePicture ||
                            "https://via.placeholder.com/300?text=Profile"
                          }
                          alt={rev.artisan?.name}
                        />
                        <div className="title-info">
                          <div>{rev.artisan?.name}</div>
                          <div
                            style={{ color: "#6366f1", fontSize: "0.85rem" }}
                          >
                            {rev.artisan?.artisanProfile?.businessName}
                          </div>
                        </div>
                      </div>
                      <StarRating>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < rev.rating ? "#f59e0b" : "transparent"}
                            color="#f59e0b"
                          />
                        ))}
                      </StarRating>
                    </div>
                    <div className="comment">{rev.comment}</div>
                    <div className="date">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </div>
                  </ReviewCard>
                ))}
                {myReviews.length === 0 && (
                  <p style={{ color: "#94a3b8" }}>
                    You haven't written any reviews yet. Leave a review for an
                    artisan above!
                  </p>
                )}
              </div>
            </Section>
          </>
        ) : (
          <>
            <StatsGrid>
              <StatCard>
                <div className="label">Your Average Rating</div>
                <div className="value">
                  {(user.artisanProfile?.rating || 0).toFixed(1)}
                  <Star
                    size={24}
                    fill="#f59e0b"
                    color="#f59e0b"
                    style={{ display: "inline" }}
                  />
                </div>
              </StatCard>
              <StatCard>
                <div className="label">Total Reviews Received</div>
                <div className="value">
                  {myReviews.length} <Star size={24} color="#ec4899" />
                </div>
              </StatCard>
            </StatsGrid>

            <Section>
              <h3 style={{ marginBottom: "1.5rem" }}>
                Reviews from your Clients
              </h3>
              <div>
                {myReviews.map((rev) => (
                  <ReviewCard key={rev._id}>
                    <div className="reviewer-header">
                      <div className="user-badge">
                        <img
                          src={
                            rev.customer?.profilePicture ||
                            "https://via.placeholder.com/300?text=Profile"
                          }
                          alt={rev.customer?.name}
                        />
                        <div className="title-info">
                          <div>{rev.customer?.name}</div>
                          <div
                            style={{
                              color: "#94a3b8",
                              fontSize: "0.8rem",
                              fontWeight: "normal",
                            }}
                          >
                            Client
                          </div>
                        </div>
                      </div>
                      <StarRating>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            fill={i < rev.rating ? "#f59e0b" : "transparent"}
                            color="#f59e0b"
                          />
                        ))}
                      </StarRating>
                    </div>
                    <div className="comment">{rev.comment}</div>
                    <div className="date">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </div>
                  </ReviewCard>
                ))}
                {myReviews.length === 0 && (
                  <p style={{ color: "#94a3b8" }}>
                    No customer reviews received yet.
                  </p>
                )}
              </div>
            </Section>
          </>
        )}
      </>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return renderOverview();
      case "settings":
        return renderSettings();
      case "portfolio":
        return user.role === "artisan" ? renderPortfolio() : renderOverview();
      case "messages":
        return renderMessages();
      case "reviews":
        return renderReviews();
      default:
        return renderOverview();
    }
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <NavItem
          active={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        >
          <User size={20} /> <span>Overview</span>
        </NavItem>
        {user && user.role === "artisan" && (
          <NavItem
            active={activeTab === "portfolio"}
            onClick={() => setActiveTab("portfolio")}
          >
            <ImageIcon size={20} /> <span>Portfolio</span>
          </NavItem>
        )}
        <NavItem
          active={activeTab === "messages"}
          onClick={() => setActiveTab("messages")}
        >
          <MessageSquare size={20} /> <span>Messages</span>
        </NavItem>
        <NavItem
          active={activeTab === "reviews"}
          onClick={() => setActiveTab("reviews")}
        >
          <Star size={20} /> <span>Reviews</span>
        </NavItem>
        <NavItem
          active={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={20} /> <span>Settings</span>
        </NavItem>
        <NavItem
          onClick={handleLogout}
          style={{ marginTop: "auto", color: "#ef4444" }}
        >
          <LogOut size={20} /> <span>Logout</span>
        </NavItem>
      </Sidebar>

      <MainContent>{renderContent()}</MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
