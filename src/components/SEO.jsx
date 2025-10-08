import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

/**
 * SEO component for managing document head metadata
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Page title
 * @param {string} props.description - Meta description
 * @param {string} [props.image] - OG image URL
 * @param {string} [props.url] - Canonical URL
 * @param {string} [props.type='website'] - OG type (website, article, etc.)
 * @param {Array} [props.keywords] - Meta keywords array
 * @param {boolean} [props.noindex=false] - Whether to prevent indexing
 * @param {Object} [props.structuredData] - JSON-LD structured data
 */
const SEO = ({
  title,
  description,
  image,
  url,
  type = 'website',
  keywords = [],
  noindex = false,
  structuredData,
}) => {
  // Default site information
  const siteTitle = 'Simeon Portfolio';
  const siteDescription = 'Professional portfolio showcasing web development and design projects';
  const siteUrl = 'https://www.simeonazeh.me'; 
  const siteImage = `${siteUrl}/og-image.jpg`; 

  // Use provided values or fallbacks
  const metaTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const metaDescription = description || siteDescription;
  const metaImage = image || siteImage;
  const canonicalUrl = url || siteUrl;

  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robot directives */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteTitle} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      
      {/* Mobile viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* JSON-LD structured data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  noindex: PropTypes.bool,
  structuredData: PropTypes.object,
};

export default SEO;